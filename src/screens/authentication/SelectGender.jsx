/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4, Pera } from '../../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import { TouchableOpacity, View } from 'react-native';
import { Color } from '../../utils/Colors';
import { Profile2User, TickCircle, User } from 'iconsax-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleGenderSelection } from '../../redux/Actions/AuthActions';
import { Message } from '../../utils/Alert';

const SelectGender = ({ navigation, route }) => {
    const [gender, setGender] = useState('male');
    const loader = useSelector((state) => state?.auth?.loadingState);
    const dispatch = useDispatch();

    const genderSelectBox = {
        backgroundColor: Color('headerIcon'),
        borderWidth: 1,
        borderColor: Color('text'),
        padding: hp('4%'),
        borderRadius: 10,
        position: 'relative',
    };

    const Selected = () => {
        return (
            <TickCircle
                size={hp('2.5%')}
                color={Color('headerIconBg')}
                variant="Bold"
                style={{ position: 'absolute', bottom: 5, right: 5 }}
            />
        );
    };


    const handleGender = () => {
        // if (gender === 'male' || gender === 'female') {
        //  dispatch(handleGenderSelection(gender, navigation, route?.params?.customerID));
        // } else {
        //     return Message('Gender selection is required', 'Please select gender!');
        // }
        navigation.navigate('Bio');
    };



    return (
        <>
            <AuthLayout navigation={navigation}>
                <Wrapper>
                    <Br space={3} />
                    <H4 bold style={{ textAlign: 'center' }}>Select Gender</H4>
                    <Br space={3} />
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
                        <View>
                            <TouchableOpacity onPress={() => setGender('male')} style={genderSelectBox}>
                                {gender === 'male' && <Selected />}
                                <User
                                    size={hp('4%')}
                                    color={Color('text')}
                                />
                            </TouchableOpacity>
                            <Pera style={{ textAlign: 'center', marginTop: hp('1.5%') }}>Male</Pera>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setGender('female')} style={genderSelectBox}>
                                {gender === 'female' && <Selected />}
                                <Profile2User
                                    size={hp('4%')}
                                    color={Color('text')}
                                />
                            </TouchableOpacity>
                            <Pera style={{ textAlign: 'center', marginTop: hp('1.5%') }}>Female</Pera>
                        </View>
                    </View>
                </Wrapper>
            </AuthLayout>
            <Btn
                loading={loader}
                onPress={handleGender}
                style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                Next
            </Btn>
        </>
    );
};

export default SelectGender;
