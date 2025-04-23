import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RadioBtn from './RadioBtn';
import { Edit } from 'iconsax-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color } from '../utils/Colors';
import { H4 } from '../utils/Text';

const MapMenuCheckBox = ({title, subTitle, mrginTop, isChecked}) => {
  return (
    <View>
        <View style={{flexDirection: 'row', marginTop: hp(mrginTop || 0), justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        <RadioBtn radioClr={'green'} isChecked={isChecked} />
        <View>
             <H4 style={{fontWeight: 'bold'}} extraBold>{title}</H4>
             <H4 extraBold style={{fontSize: wp('3.1%')}}>{subTitle}</H4>
        </View>
            </View>
            <View>
        <TouchableOpacity
                                    onPress={() => {}}
                                >
                                    <Edit
                                        size={hp('3.5%')}
                                        color={Color('text')}
                                        variant="Bold"
                                    />
                                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default MapMenuCheckBox;