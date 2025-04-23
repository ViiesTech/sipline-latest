/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Wrapper from '../../utils/Wrapper';
import AuthLayout from './AuthLayout';
import { H4 } from '../../utils/Text';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Br from '../../components/Br';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../utils/Alert';
import { handleBioUpdate } from '../../redux/Actions/AuthActions';

const Bio = ({ navigation, route }) => {
    const validator = require('validator');
    const [bio, setBio] = useState('');
    const loader = useSelector((state) => state?.auth?.loadingState);
    const dispatch = useDispatch();

    const addBioSection = () => {
        // if (validator.isEmpty(bio)) {
        //     Message('Bio is required!', 'Please enter your Bio.');
        //     return false;
        // }
        // if (bio?.length < 3) {
        //     Message('Bio is not valid!', 'Bio can only contains letters, minimum 3 letters are required.');
        //     return false;
        // }
        // dispatch(handleBioUpdate(bio, navigation, route.params?.customerID));
        navigation.navigate('AddLocation');
    };

    return (
        <>
            <AuthLayout navigation={navigation}>
                <Wrapper>
                    <Br space={3} />
                    <H4 bold style={{ textAlign: 'center' }}>Add Bio</H4>
                    <Br space={3} />
                    <Input
                        multiline
                        numberOfLines={10}
                        placeholder="Bio"
                        onChangeText={(text) => setBio(text)}
                    />
                </Wrapper>
            </AuthLayout>
            <Btn
                loading={loader}
                onPress={addBioSection}
                style={{ position: 'absolute', zIndex: 1, bottom: hp('3%'), width: wp('88%'), alignSelf: 'center' }}>
                Next
            </Btn>
        </>
    );
};

export default Bio;
