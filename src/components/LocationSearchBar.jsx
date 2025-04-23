import { ArrowDown2, Location } from 'iconsax-react-native';
import React from 'react';
import Input from './Input';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LocationSearchBar = ({ }) => {
    return (
        <Input
            leftIcon={<><Location size={hp('2%')} color="#04212D" /></>}
            rightIcon={<><ArrowDown2 size={hp('2%')} color="#04212D" /></>}
            styling={{ borderRadius: wp('6%'), marginBottom:hp('2%') }}
            placeholder="Search Your Location"
        />
    );
};

export default LocationSearchBar;
