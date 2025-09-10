/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Background from '../utils/Background';
import Header from '../components/Header';
import Wrapper from '../utils/Wrapper';
import {Pera} from '../utils/Text';
import {View} from 'react-native';
import {Color} from '../utils/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {handlePrivacy} from '../redux/Actions/UsersActions';
import {LoadingAnimation} from '../utils/Alert';
import {responsiveFontSize} from '../utils/Responsive';

const PrivacyPolicy = ({navigation}) => {
  const dispatch = useDispatch();
  const allPrivacyData = useSelector(state => state?.inApp);

  // useEffect(() => {
  //   if (!allPrivacyData?.privacyText?.content) {
  //     dispatch(handlePrivacy());
  //   }
  // }, []);

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
  const privacyPolicyData = [
    {id: 1, text: 'Effective Date: June 1, 2025'},
    {id: 2, text: '1. Overview'},
    {
      id: 3,
      text: `SipLine, a service of KHR Enterprize LLC (“SipLine,” “we,” “us,” or “our”), is committed to protecting user privacy. This Privacy Policy describes how we collect, use, and disclose user personal information through the SipLine mobile application and website. By accessing or using SipLine, users consent to this Privacy Policy and our Terms of Use. If users do not agree, please discontinue use of the service.`,
    },
    {id: 4, text: '2. Information We Collect'},
    {id: 5, text: 'a. Personal Information'},
    {
      id: 6,
      text: `We may collect the following when users create an account, make a purchase, or use the app:\n- Full name\n- Email address\n- Mobile phone number\n- Billing and shipping addresses\n- Payment details (processed securely via third-party provider)\n- Location data (with permission)`,
    },
    {id: 7, text: 'b. Usage Data'},
    {
      id: 8,
      text: `When users use the app or website, we automatically collect:\n- Device type and operating system\n- IP address\n- App usage patterns\n- Pages or features accessed\n- Location information (if enabled)\n- Cookies and tracking technologies for analytics and personalization`,
    },
    {id: 9, text: '3. How We Use Your Information'},
    {
      id: 10,
      text: `We use user data to:\n- Process cocktail pre orders and subscriptions\n- Personalize offers, recommendations, and content\n- Communicate about user account and promotions\n- Improve our services and user experience\n- Prevent fraud and ensure system integrity\n- Enforce our Terms of Use and comply with legal obligations`,
    },
    {id: 11, text: '4. Sharing Your Information'},
    {
      id: 12,
      text: `SipLine does not sell user personal information. We only share user information with:\n- Payment processors (to complete transactions)\n- Technical vendors and service providers (hosting, customer support, etc.)\n- Legal authorities when required by law or to protect SipLine’s rights\n- In the event of a merger, acquisition, or asset sale\n\nThese parties are bound to use user data solely to provide contracted services.`,
    },
    {id: 13, text: '5. Data Retention'},
    {
      id: 14,
      text: `We retain user information:\n- As long as your account is active\n- As needed to deliver services and fulfill subscriptions\n- As required by law or to resolve disputes\n\nYou may request deletion of your account by contacting us.`,
    },
    {id: 15, text: '6. Your Rights'},
    {
      id: 16,
      text: `You have the right to:\n- Access or request a copy of your data\n- Correct or delete your personal information\n- Opt out of marketing communications\n- Revoke access to location services via your device settings\n\nTo make a privacy request, contact: info@KHRenterprize.com`,
    },
    {id: 17, text: '7. Security'},
    {
      id: 18,
      text: `We use commercially reasonable safeguards (including encryption and secure servers) to protect your data. However, no system is 100% secure, and users share data with us at their own risk.`,
    },
    {id: 19, text: '8. Children’s Privacy'},
    {
      id: 20,
      text: `SipLine is intended for users aged 21 and older. We do not knowingly collect personal information from anyone under 21. If users believe a minor has submitted data, contact us so we can delete it.`,
    },
    {id: 21, text: '9. Changes to This Policy'},
    {
      id: 22,
      text: `We may update this Privacy Policy periodically. Updates will be posted here with a new effective date. Continued use of SipLine after changes means you accept the updated terms.`,
    },
    {id: 23, text: '10. Contact'},
    {
      id: 24,
      text: `For questions about this policy or to exercise your privacy rights, contact:\n📧 info@KHRenterprize.com`,
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
          title="Privacy Policy"
          withBack
        />
        <View style={{paddingTop: hp('3%')}}>
          {/* {false
                         ?
                        <LoadingAnimation />
                        :
                    } */}
          {privacyPolicyData.map((item, index) => {
            return (
              <View style={{margin: 5}}>
                <Pera
                  key={item.id}
                  color={Color('text')}
                  style={{
                    whiteSpace: 'pre-line',
                    fontSize: responsiveFontSize(1.7),
                    // whiteSpace: 'pre-line',
                    // textAlign: 'justify',
                    // fontSize: responsiveFontSize(1.7),
                    fontWeight: item.text.match(/^\d|^[a-z]\.|^Effective Date/)
                      ? '600'
                      : '400',
                  }}>
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

export default PrivacyPolicy;
