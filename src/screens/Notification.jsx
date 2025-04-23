/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import Background from '../utils/Background';
import Wrapper from '../utils/Wrapper';
import { H6, Pera } from '../utils/Text';
import Br from '../components/Br';
import { MessageTick, TickSquare } from 'iconsax-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleNotificationsList, handleNotificationsRead } from '../redux/Actions/UsersActions';
import { LoadingAnimation, NoResultFound, timeAndDate } from '../utils/Alert';
import { notificationData } from '../utils/LocalData';

const Notification = ({ navigation }) => {
    const dispatch = useDispatch();
    const notificationsData = useSelector(state => state?.inApp);

    const data = notificationsData?.allNotificationList?.length > 0 ? notificationsData : notificationData

    useEffect(() => {
        dispatch(handleNotificationsList());
    }, []);

    const NotificationCard = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'column', borderWidth: hp('0.15%'), padding: hp('2%'), marginBottom: hp('3%'),
                backgroundColor: item?.unread ? '#bfffbf' : 'transparent',
                borderColor: item?.unread ? '#bfffbf' : '#000',
                borderRadius: wp('2%'),
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp('1.5%'), marginBottom: hp('1%') }}>
                    <TickSquare size={hp('3%')} color={Color('ratingStar')} variant={item?.unread ? 'Bold' : 'Outline'}  />
                    <H6 bold>{item.title}</H6>
                </View>
                <Pera medium>{item.body}</Pera>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(handleNotificationsRead(item?.notification_id));
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('2%') }}>
                    <Pera>{timeAndDate(item?.createdAt)?.toString()}</Pera>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp('0.8%') }}>
                        <MessageTick size={hp('2%')} color={Color('text')} variant={item?.unread ? 'Bold' : 'Outline'} />
                        <Pera>Mark as Read</Pera>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Background>
            <Wrapper>
                <Header withBack onlyTitle title={'Notification'} navigation={navigation} />
                <Br space={3} />
                <Wrapper>
                    {notificationsData?.loadingState ?
                        <LoadingAnimation />
                        :
                        <>
                            {
                                data?.allNotificationList?.length > 0
                                ?
                                data?.allNotificationList?.map((item, index) => (<NotificationCard item={item} />))
                                :
                                <NoResultFound />
                            }
                        </>
                    }
                </Wrapper>

            </Wrapper>
        </Background>
    );
};

export default Notification;
