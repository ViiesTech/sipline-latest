/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {View} from 'react-native';
import {Pera} from '../utils/Text';
import {Color} from '../utils/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {handleReturnPolicy} from '../redux/Actions/UsersActions';
import {LoadingAnimation} from '../utils/Alert';
import { responsiveFontSize } from '../utils/Responsive';

const Return = ({navigation}) => {
  const dispatch = useDispatch();
  const allReturnPolicyData = useSelector(state => state?.inApp);
  const data = [
    {
      id: 1,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 2,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
    {
      id: 3,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
    },
    {
      id: 4,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in.',
    },
    {
      id: 5,
      text: ' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
    },
  ];
  //   useEffect(() => {
  //     if (!allReturnPolicyData?.returnPolicy?.content) {
  //       dispatch(handleReturnPolicy());
  //     }
  //   }, []);

  return (
    <Background>
      <Wrapper>
        <Header
          navigation={navigation}
          onlyTitle
          title="Return Policy"
          withBack
        />
        <View style={{paddingTop: hp('3%')}}>
          {/* {false
                         ?
                        <LoadingAnimation />
                        :
                    } */}
          {data.map((item, index) => {
            return (
                <View style={{margin:10}}>

              <Pera
                key={item.id}
                color={Color('text')}
                style={{whiteSpace: 'pre-line', textAlign: 'justify',fontSize:responsiveFontSize(1.7)}}>
                {item.text}
              </Pera>
                    </View>
            );
          })}
        </View>
      </Wrapper>
    </Background>
  );
};

export default Return;
