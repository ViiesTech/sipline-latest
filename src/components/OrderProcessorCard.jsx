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
import {responsiveHeight} from '../utils/Responsive';
import { imageUrl } from '../utils/Api_contents';

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
  createdAt,
  shopImage,
  barName,
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
  console.log(shopImage)
  return (
    <>
      <Wrapper>
        {isBr ? <Br space={4.5} /> : null}
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
            resizeMode={shopImage ? 'cover' : "contain"}
            source={shopImage ? { uri: `${imageUrl}${shopImage}` } : require('../assets/images/chiefImg.png')}
            style={{
              width: hp('20%'),
              height: hp('20%'),
              alignSelf: 'center',
              borderRadius: shopImage ? hp('10%') : 0,
            }}
          />
          {/* <H4
            style={{textAlign: 'center'}}
            bold>{` Order ID #${shortId}`}</H4> */}
            <H4
            style={{textAlign: 'center'}}
            bold>{`${barName}`}</H4>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveHeight(1),
              alignItems: 'center',
            }}>
            <Pera color={Color('mapSearchBorder')}>
              {moment(dateTime, 'DD-MM-YYYY').format('MMMM D, YYYY')}
            </Pera>
            {createdAt && (
              <Pera color={Color('mapSearchBorder')}>{createdAt}</Pera>
            )}
          </View>
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
            {label: 'Platform Charges', value: `$ ${platFormCharges}`},
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
