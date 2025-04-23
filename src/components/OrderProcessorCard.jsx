/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { TickCircle } from 'iconsax-react-native';
import Wrapper from '../utils/Wrapper';
import Br from './Br';
import { Image, View } from 'react-native';
import { H3, H4, Pera } from '../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import TotalCard from './TotalCard';

const OrderProcessorCard = ({
    isPickedUp,
    time,
    id,
    salesTax,
    subTotal,
    grandTotal,
    platFormCharges,
    orderAddress,
    coupon,
    dateTime,
}) => {
    const currentDate = dateTime ? new Date(dateTime) : 'none';
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    return (
        <>
            <Wrapper >
                <Br space={4.5} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {isPickedUp &&
                        <>
                            <TickCircle size={hp('6%')} color={Color('orderPlacedTick')} variant="Bold" />
                            <H3 style={{ textAlign: 'center', marginBottom: wp('3%') }} bold>
                                Your Order Has{'\n'}
                                Been Placed!</H3>
                            <H4 style={{ textAlign: 'center' }} bold>{`${time || '20-35'} mins`}</H4>
                            <Pera>Estimated Time</Pera>
                        </>}
                    <Image
                        resizeMode="contain"
                        source={require('../assets/images/chiefImg.png')}
                        style={{
                            width: hp('20%'),
                            height: hp('20%'),
                            alignSelf: 'center',
                        }}
                    />
                    <H4 style={{ textAlign: 'center' }} bold>{` Ordert iD # ${id}`}</H4>
                    <Pera color={Color('mapSearchBorder')}>{currentDate === 'none' ? '22/04/2025' : formatter.format(currentDate).toString()}</Pera>
                </View>
                <TotalCard
                    beforeTotal={[
                        { label: 'Restaurant Name', value: orderAddress || 'No Address Found' },
                        { label: 'Sub Total', value: `$ ${subTotal}` },
                        { label: 'Coupon Code Discount', value: coupon },
                        { label: 'Sales Tax', value: `$ ${salesTax}` },
                        { label: 'Plat Form Charges', value: `$ ${platFormCharges}` },
                        { label: '', value: '', line: true },
                        { label: 'Grand Total', value: `$ ${grandTotal}` },
                    ]}
                />
                <Br space={1} />
            </Wrapper>
        </>
    );
};


export default OrderProcessorCard;
