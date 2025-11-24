import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigateToMainStackRoute } from './notificationNavigation';
import { emitOrderHistoryRefresh } from '../utils/NotificationEvents';
import { getOrderByOrderId } from './Apis';

const CHANNEL_ID = 'sipline_default_channel';
const CHANNEL_NAME = 'Sipline';

async function createDefaultChannel() {
  return notifee.createChannel({
    id: CHANNEL_ID,
    name: CHANNEL_NAME,
    importance: AndroidImportance.HIGH,
  });
}

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log('Notification permission not granted.');
  }
  return enabled;
}

async function displayNotification(remoteMessage) {
  const title = remoteMessage?.notification?.title ?? 'Sipline';
  const body =
    remoteMessage?.notification?.body ?? remoteMessage?.data?.message ?? '';
  const notificationId = remoteMessage?.messageId ?? remoteMessage?.message_id;

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: CHANNEL_ID,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
    data: {
      ...remoteMessage?.data,
      _messageId: notificationId,
    },
  });
}

let backgroundHandlerRegistered = false;
let notifeeListenersRegistered = false;

function ensureBackgroundHandler() {
  if (backgroundHandlerRegistered) {
    return;
  }
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📩 Background FCM Message:', remoteMessage?.messageId);
    await displayNotification(remoteMessage);
  });
  backgroundHandlerRegistered = true;
}

export async function setupNotificationListeners() {
  await createDefaultChannel();
  await requestUserPermission();
  ensureBackgroundHandler();
  registerNotifeeEventHandlers();

  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('📩 Foreground FCM Message:', remoteMessage?.messageId);
    await displayNotification(remoteMessage);
    maybeTriggerOrderHistoryRefresh(remoteMessage?.data);
  });

  const unsubscribeOnNotificationOpened =
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('🔁 Notification opened:', remoteMessage?.messageId);
      handleNotificationNavigation(remoteMessage);
    });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('🚀 App opened from quit state via notification');
        handleNotificationNavigation(remoteMessage);
      }
    });

  return () => {
    unsubscribeOnMessage();
    unsubscribeOnNotificationOpened();
  };
}

function registerNotifeeEventHandlers() {
  if (notifeeListenersRegistered) {
    return;
  }

  notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      handleNotificationNavigation(detail?.notification);
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      await handleNotificationNavigation(detail?.notification);
    }
  });

  notifeeListenersRegistered = true;
}

function maybeTriggerOrderHistoryRefresh(data = {}, params) {
  const orderId = getOrderIdFromPayload(data, params);
  const status = getOrderStatusFromPayload(data, params);
  if (orderId || data?.refreshOrders === 'true') {
    emitOrderHistoryRefresh({orderId, status});
  }
}

async function handleNotificationNavigation(payload) {
  if (!payload) {
    return;
  }

  try {
    await processNotificationNavigation(payload);
  } catch (error) {
    console.log('⚠️ Notification navigation failed:', error?.message);
  }
}

async function processNotificationNavigation(payload) {
  const data = payload?.data ?? payload?.notification?.data ?? {};
  const params = parseParams(data?.params);
  const orderId = getOrderIdFromPayload(data, params);
  const status = getOrderStatusFromPayload(data, params);
  maybeTriggerOrderHistoryRefresh(data, params);

  let destination = data?.screen;
  if (!destination && orderId) {
    destination = 'OrderPreparing';
  }
  destination = destination || 'MyOrdersList';

  if (destination === 'OrderPreparing') {
    const orderParams = await buildOrderPreparingParams(orderId, params);
    if (orderParams) {
      navigateToMainStackRoute('OrderPreparing', orderParams);
      return;
    }
    console.log('ℹ️ Falling back to Order History due to missing order data');
    navigateToMainStackRoute('MyOrdersList', {
      refreshOrders: true,
      targetStatus: status,
    });
    return;
  }

  const mergedParams = {
    ...(params ?? {}),
    ...(destination === 'MyOrdersList'
      ? {refreshOrders: true, targetStatus: status}
      : {}),
  };

  navigateToMainStackRoute(destination, mergedParams);
}

function parseParams(rawParams) {
  if (!rawParams) {
    return undefined;
  }
  if (typeof rawParams === 'string') {
    return safeParse(rawParams);
  }
  if (typeof rawParams === 'object') {
    return rawParams;
  }
  return undefined;
}

async function buildOrderPreparingParams(orderId, params) {
  if (params?.data) {
    return params;
  }

  if (!orderId) {
    console.log('⚠️ Notification missing orderId for OrderPreparing');
    return null;
  }

  try {
    const response = await getOrderByOrderId(orderId);
    const orderData = response?.data;
    if (!orderData) {
      return params ?? {};
    }

    const shortOrderId = orderData?._id?.slice(-5);

    return {
      data: {...orderData, shortOrderId},
      showOrderCard: true,
      status: orderData?.status,
      createdAt: orderData?.createdAt,
    };
  } catch (error) {
    console.log('⚠️ Failed to fetch order data for notification:', error?.message);
    return null;
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return undefined;
  }
}

function getOrderIdFromPayload(data = {}, params = {}) {
  return data?.orderId || data?.order_id || params?.orderId || params?._id;
}

function getOrderStatusFromPayload(data = {}, params = {}) {
  return (
    data?.status ||
    data?.orderStatus ||
    data?.order_status ||
    params?.status ||
    params?.orderStatus ||
    params?.order_status
  );
}
