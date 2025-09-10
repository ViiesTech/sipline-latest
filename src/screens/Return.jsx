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
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';

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

  const termsData = [
    // ... previous sections (1–8)

    {id: 1, text: '1. Refunds & Cancellations'},
    {
      id: 2,
      text: `Due to the nature of beverage service, which prohibits the resale or restocking of prepared drinks, full refunds are only available prior to drink preparation. Users may request a full refund only if the beverage has not yet been made.\n\nOnce a beverage is marked as “Picked Up” or otherwise confirmed as made, the refund request will be handled on a case by case basis.\n\nIf a venue approves and processes a refund at the location, SipLine is released from any financial obligation related to that order. Refund timelines vary by venue and payment provider but may take 5–10 business days to reflect in the user’s account.\n\nEach refund request is reviewed individually and is not guaranteed. All refund decisions are final and at the sole discretion of SipLine or the partner venue, depending on timing and circumstances.\n\nRefunds may be issued on a case-by-case basis under the following conditions:\n- At the discretion of the bartender or partner venue staff.\n- Entry to the participating venue is denied, preventing the user from retrieving the beverage.\n- The requested beverage is unavailable due to inventory limitations at the partner venue.\n\nRefund requests outside of these conditions may not be honored. Abuse of the refund policy may result in account suspension or termination.`,
    },

    {id: 3, text: '2. Intellectual Property'},
    {
      id: 4,
      text: `All trademarks, logos, app content, software, text, graphics, and branding are owned and or licensed to SipLine.\n\nUnless we expressly authorize users in writing, one may not modify, publish, copy, display, distribute, transmit, reproduce, license, create derivative works from, adapt, transfer, sell or in any manner commercially exploit any of the trademarks, logos, app content, software, text, graphics, and branding (Content) are owned and or licensed to SipLine.\n\nThis prohibition includes, but is not limited to, the practice of “screen scraping” which we consider theft or conversion of the Content and those who obtain the Content in this manner will be liable to SipLine.\n\nBy using SipLine or the Services, users represent to us that they will not use the Content for any unlawful purpose, tortious conduct or any prohibited use. If we determine, in our sole discretion, that any user is in violation of the Agreement, then we may block access to or use of SipLine and/or the Services or terminate this Agreement.`,
    },

    {id: 5, text: '3. Disclaimers & Limitation of Liability'},
    {
      id: 6,
      text: `a. Disclaimer:\nThe Services are provided “as is” and “as available.” SipLine disclaims all express or implied warranties, including fitness for a particular purpose or merchantability.\n\nb. Limitation of Liability:\nSipLine’s liability for any claim shall not exceed the amount you paid for the specific transaction in dispute. We are not liable for:\n- Missed pickup windows\n- Incorrect drink preparation\n- Delays caused by venues\n- Indirect, incidental, or consequential damages\n\nSome jurisdictions do not allow certain exclusions, so these limitations may not apply fully.`,
    },

    {id: 7, text: '4. Indemnification'},
    {
      id: 8,
      text: `Users agree to indemnify, defend, and hold harmless SipLine, its affiliates, officers, agents, and employees from all claims, liabilities, damages, and expenses (including attorney’s fees) arising out of the users:\n- Misuse of the Services\n- Violation of these Terms\n- Violation of any applicable law or third-party right`,
    },

    {id: 9, text: '5. Dispute Resolution'},
    {
      id: 10,
      text: `a. Informal Process:\nPlease contact us first with any concerns. We strive to resolve disputes amicably.\n\nb. Arbitration Agreement:\nIf unresolved, users agree to resolve all disputes through binding arbitration conducted in Louisville, Kentucky, under the rules of the American Arbitration Association (AAA). Users waive the right to participate in any class action or jury trial.\n\nc. Jurisdiction-Specific Rights:\nIf users reside outside the U.S., local consumer rights may apply and may override certain arbitration clauses.`,
    },

    {id: 11, text: '6. Governing Law'},
    {
      id: 12,
      text: `These Terms and any disputes will be governed exclusively by the laws of the Commonwealth of Kentucky, without regard to conflict-of-law principles.`,
    },

    {id: 13, text: '7. Changes to Terms'},
    {
      id: 14,
      text: `We may revise these Terms at any time. Material changes will be announced via email or app notification. Continued use of the Services after changes constitutes users’ agreement to the new terms.`,
    },

    {id: 15, text: '8. Contact Us'},
    {
      id: 16,
      text: `If there are any questions or concerns about these Terms, please email:\n📧 info@khrenterprize.com\n\nSipLine does not provide phone support. All communications must be via email for record-keeping and legal purposes.`,
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
          {termsData.map((item, index) => {
            return (
              <View style={{margin: 5, marginVertical: responsiveHeight(1)}}>
                <Pera
                  key={item.id}
                  color={Color('text')}
                  style={{
                    whiteSpace: 'pre-line',
                    fontSize: responsiveFontSize(1.7),
                    fontWeight: item.text.match(/^\d|^[a-z]\.|^Refunds/)
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

export default Return;
