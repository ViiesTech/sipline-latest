import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Sheet from './Sheet';
import Wrapper from '../utils/Wrapper';
import Br from './Br';
import { H6 } from '../utils/Text';
import Btn from './Btn';
import MapMenuCheckBox from './MapMenuCheckBox';

const ConfirmLocationModal = ({open, setOpen}) => {
  return (
    <Sheet open={open} setOpen={setOpen} height={hp('60%')}>
        <Wrapper x={1}>
        <Br space={4} />
        <H6 extraBold style={{ marginBottom: wp('2%'), fontWight: 'bold', fontSize: wp('5%') }}>Use current location</H6>
        <Image source={require('../assets/images/Mask.png')} style={{width: wp('92%'), height: hp('20%')}} />
        <Br space={4} />
      <TouchableOpacity>
        <MapMenuCheckBox title={'Sweet Home'} subTitle={'street no 545 green valve'} isChecked={true} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MapMenuCheckBox title={'Office'} subTitle={'street no 545 green valve'} mrginTop={2}/>
      </TouchableOpacity>
        <Br space={4} />
        <View style={{alignItems: 'flex-end'}}>
        <Btn onPress={() => setOpen(false)} style={{width: wp('40%')}}>
                    Confirm Location
                </Btn>
        </View>
        </Wrapper>
    </Sheet>
  )
}

export default ConfirmLocationModal;