/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import { View } from 'react-native';
import { Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingAnimation } from '../utils/Alert';
import { handleTermsConditions } from '../redux/Actions/UsersActions';

const Terms = ({ navigation }) => {
    const dispatch = useDispatch();
    const allTermsData = useSelector(state => state?.inApp);

    useEffect(() => {
        if (!allTermsData?.termsCondition?.content) {
            dispatch(handleTermsConditions());
        }
    }, []);

    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} onlyTitle title="Terms & Conditions" withBack />
                <View style={{ paddingTop: hp('3%') }}>
                    {allTermsData.loadingState ?

                        <LoadingAnimation />
                        :
                        <Pera color={Color('text')} style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                            {allTermsData?.termsCondition?.content || 'Oops!  Terms And COnditions will be updated soon'}
                        </Pera>
                    }
                </View>
            </Wrapper>
        </Background>
    );
};

export default Terms;
