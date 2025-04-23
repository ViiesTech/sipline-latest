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
import { handleReturnPolicy } from '../redux/Actions/UsersActions';
import { LoadingAnimation } from '../utils/Alert';

const Return = ({ navigation }) => {
    const dispatch = useDispatch();
    const allReturnPolicyData = useSelector(state => state?.inApp);

    useEffect(() => {
        if (!allReturnPolicyData?.returnPolicy?.content) {
            dispatch(handleReturnPolicy());
        }
    }, []);


    return (
        <Background>
            <Wrapper>
                <Header navigation={navigation} onlyTitle title="Return Policy" withBack />
                <View style={{ paddingTop: hp('3%') }}>
                    {allReturnPolicyData.loadingState
                         ?
                        <LoadingAnimation />
                        :
                        <Pera color={Color('text')} style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                            {allReturnPolicyData?.returnPolicy?.content || 'Oops! Return Policy will be updated soon'}
                        </Pera>
                    }
                </View>
            </Wrapper>
        </Background>
    );
};

export default Return;
