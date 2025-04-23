/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import { Pera } from '../utils/Text';
import { View } from 'react-native';
import { Color } from '../utils/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { handlePrivacy } from '../redux/Actions/UsersActions';
import { LoadingAnimation } from '../utils/Alert';

const PrivacyPolicy = ({ navigation }) => {
    const dispatch = useDispatch();
    const allPrivacyData = useSelector(state => state?.inApp);

    useEffect(() => {
        if (!allPrivacyData?.privacyText?.content) {
            dispatch(handlePrivacy());
        }
    }, []);


    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} onlyTitle title="Privacy Policy" withBack />
                <View style={{ paddingTop: hp('3%') }}>
                    {allPrivacyData.loadingState
                        ?
                        <LoadingAnimation />
                        :
                        <Pera color={Color('text')} style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                            {allPrivacyData?.privacyText?.content || 'Oops! Privacy Policy will be updated soon'}
                        </Pera>
                    }
                </View>
            </Wrapper>
        </Background>
    );
};

export default PrivacyPolicy;
