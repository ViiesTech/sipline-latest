/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {TickCircle} from 'iconsax-react-native';
import Wrapper from '../utils/Wrapper';
import Br from './Br';
import {Image, View} from 'react-native';
import {H3, H4, Pera} from '../utils/Text';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/Colors';
import TotalCard from './TotalCard';
import moment from 'moment';

const OrderProcessorCard = ({
  isPickedUp,
  time,
  id,
  shortId,
  salesTax,
  subTotal,
  grandTotal,
  platFormCharges,
  orderAddress,
  coupon,
  dateTime,
  isBr = true,
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
      <Wrapper>
        {isBr ? (
          <Br space={4.5} />
        ) : null}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isPickedUp && (
            <>
              <TickCircle
                size={hp('6%')}
                color={Color('orderPlacedTick')}
                variant="Bold"
              />
              <H3 style={{textAlign: 'center', marginBottom: wp('3%')}} bold>
                Your Order Has{'\n'}
                Been Placed!
              </H3>
              <H4 style={{textAlign: 'center'}} bold>{`${
                time || '20-35'
              } mins`}</H4>
              <Pera>Estimated Time</Pera>
            </>
          )}
          <Image
            resizeMode="contain"
            source={require('../assets/images/chiefImg.png')}
            style={{
              width: hp('20%'),
              height: hp('20%'),
              alignSelf: 'center',
            }}
          />
          <H4
            style={{textAlign: 'center'}}
            bold>{` Ordert iD # ${shortId}`}</H4>
          <Pera color={Color('mapSearchBorder')}>
            {moment(dateTime, 'DD-MM-YYYY').format('MMMM D, YYYY')}
          </Pera>
        </View>
        <TotalCard
          beforeTotal={[
            {
              label: 'Restaurant Name',
              value: orderAddress || 'No Address Found',
            },
            {label: 'Sub Total', value: `$ ${subTotal}`},
            {label: 'Coupon Code Discount', value: coupon},
            {label: 'Sales Tax', value: `$ ${salesTax}`},
            {label: 'Plat Form Charges', value: `$ ${platFormCharges}`},
            {label: '', value: '', line: true},
            {label: 'Grand Total', value: `$ ${grandTotal}`},
          ]}
        />
        <Br space={1} />
      </Wrapper>
    </>
  );
};

export default OrderProcessorCard;
