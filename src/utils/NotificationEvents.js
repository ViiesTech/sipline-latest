import {DeviceEventEmitter} from 'react-native';

export const ORDER_HISTORY_REFRESH_EVENT = 'ORDER_HISTORY_REFRESH';

export const emitOrderHistoryRefresh = payload => {
  DeviceEventEmitter.emit(ORDER_HISTORY_REFRESH_EVENT, payload);
};
