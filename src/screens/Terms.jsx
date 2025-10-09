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
import {LoadingAnimation} from '../utils/Alert';
import {handleTermsConditions} from '../redux/Actions/UsersActions';
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';

const Terms = ({navigation}) => {
  const dispatch = useDispatch();
  const allTermsData = useSelector(state => state?.inApp);

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
    {id: 1, text: 'Terms & Conditions – SipLine'},

    {id: 2, text: '1. Eligibility'},
    {
      id: 3,
      text: `To use the SipLine application (“App”) and services (“Services”), you must be at least 21 years of age or the legal drinking age in your location, whichever is greater. By using the Services, you represent and warrant that you meet this requirement. Use of the App is void where prohibited.`,
    },

    {id: 4, text: '2. Our Services'},
    {
      id: 5,
      text: `SipLine enables users to:\n- Discover and browse participating bars, restaurants, and venues\n- Pre-order alcoholic and non-alcoholic beverages\n- Customize drink selections\n- Receive real-time order status updates\n- Access membership perks through paid subscriptions\n\nSipLine is a technology platform. We do not prepare, sell, or deliver beverages. Orders are fulfilled by independently operated third-party bars, restaurants, and venues.`,
    },

    {id: 6, text: '3. Venue Access Disclaimer'},
    {
      id: 7,
      text: `Entry into participating venues is solely at the discretion of the venue. SipLine does not guarantee entry and is not responsible for denied admission, cover charges, dress code enforcement, age verification, capacity limits, or any other venue-specific policies or requirements. Users are responsible for complying with all entry conditions imposed by the venue. SipLine facilitates drink orders but does not control access to or the physical operations of third-party venues.`,
    },

    {id: 8, text: '4. User Accounts'},
    {
      id: 9,
      text: `By creating an account, users agree to:\n- Provide true, accurate, and complete information\n- Maintain the confidentiality of user credentials\n- Be responsible for all activities under user accounts\n\nSipLine may suspend or terminate accounts for suspected misuse, fraud, or violation of these Terms.`,
    },

    {id: 10, text: '5. Payments & Billing'},
    {
      id: 11,
      text: `a. Payment Authorization:\nUser authorizes SipLine to charge the chosen payment method at the time of purchase, including taxes and service fees.\n\nb. Fraudulent Activity:\nFraudulent chargebacks or misuse of the platform will result in account suspension, possible legal action, and liability for all incurred damages.`,
    },

    {id: 12, text: '6. Subscriptions'},
    {
      id: 13,
      text: `SipLine offers recurring subscriptions with VIP perks such as discounts, expedited service, and early access to exclusive events.\n\n- Subscriptions auto-renew at the beginning of each billing cycle based on the original purchase date, unless canceled beforehand.\n- Fees are non-refundable after renewal.\n- Users may cancel at any time via account settings; benefits will remain active through the paid period.\n- SipLine reserves the right to adjust subscription pricing from time to time to reflect changes in operational costs, including but not limited to inflation and market conditions. Users will be notified of any such changes at least 30 days in advance. Continued use of the service after the effective date of the pricing change constitutes acceptance of the new rate.`,
    },

    {id: 14, text: '7. Prohibited Conduct'},
    {
      id: 15,
      text: `Users may not:\n- Use the Services for any unlawful, harmful, or fraudulent purpose\n- Violate any local, state, or federal laws regarding alcohol consumption\n- Interfere with the operation of the App or any venue\n- Attempt to scrape, reverse engineer, or duplicate SipLine technology\n\nViolation of these rules may result in permanent suspension. Violations shall be reported to the appropriate authorities.`,
    },

    {id: 16, text: '8. Partner Venue Responsibility'},
    {
      id: 17,
      text: `Partner venues are solely responsible for:\n- Preparing and serving drinks correctly, as ordered\n- Complying with all liquor laws, including ID and age verification, and beverage consumption\n- Handling any customer service issues directly related to drink preparation or service\n- Selecting and maintaining the quality of liquor brands offered through SipLine, ensuring that all products meet advertised standards and customer expectations\n\nSipLine is not liable for venue-related service failures, including issues related to brand substitutions or quality discrepancies, but will assist in dispute resolution when contacted within 24 hours of service.`,
    },

    {id: 18, text: '9. Refunds & Cancellations'},
    {
      id: 19,
      text: `Due to the nature of beverage service, which prohibits the resale or restocking of prepared drinks, full refunds are only available prior to drink preparation. Users may request a full refund only if the beverage has not yet been made.\n\nOnce a beverage is marked as “Picked Up” or otherwise confirmed as made, the refund request will be handled on a case by case basis.\n\nIf a venue approves and processes a refund at the location, SipLine is released from any financial obligation related to that order. Refund timelines vary by venue and payment provider but may take 5–10 business days to reflect in the user’s account.\n\nEach refund request is reviewed individually and is not guaranteed. All refund decisions are final and at the sole discretion of SipLine or the partner venue, depending on timing and circumstances.\n\nRefunds may be issued on a case-by-case basis under the following conditions:\n- At the discretion of the bartender or partner venue staff.\n- Entry to the participating venue is denied, preventing the user from retrieving the beverage.\n- The requested beverage is unavailable due to inventory limitations at the partner venue.\n- Refund requests outside of these conditions may not be honored. Abuse of the refund policy may result in account suspension or termination.`,
    },

    {id: 20, text: '10. Intellectual Property'},
    {
      id: 21,
      text: `All trademarks, logos, app content, software, text, graphics, and branding are owned and or licensed to SipLine.\n\nUnless we expressly authorize users in writing, one may not modify, publish, copy, display, distribute, transmit, reproduce, license, create derivative works from, adapt, transfer, sell or in any manner commercially exploit any of the trademarks, logos, app content, software, text, graphics, and branding (Content) are owned and or licensed to SipLine. This prohibition includes, but is not limited to, the practice of “screen scraping” which we consider theft or conversion of the Content and those who obtain the Content in this manner will be liable to SipLine The SipLine www.thesipline.com. By using SipLine The SipLine www.thesipline.com or the Services users represent to us that they will not use their content or the Content for any unlawful purpose, tortious conduct or any prohibited use. If we determine, in our sole discretion, that any user is in violation of the Agreement, then we may block access to or use of SipLine The SipLine www.thesipline.com and/or the Services or terminate this Agreement.`,
    },

    {id: 22, text: '11. Disclaimers & Limitation of Liability'},
    {
      id: 23,
      text: `a. Disclaimer:\nThe Services are provided “as is” and “as available.” SipLine disclaims all express or implied warranties, including fitness for a particular purpose or merchantability.\n\nb. Limitation of Liability:\nSipLine’s liability for any claim shall not exceed the amount you paid for the specific transaction in dispute. We are not liable for:\n- Missed pickup windows\n- Incorrect drink preparation\n- Delays caused by venues\n- Indirect, incidental, or consequential damages\n\nSome jurisdictions do not allow certain exclusions, so these limitations may not apply to users fully.`,
    },

    {id: 24, text: '12. Indemnification'},
    {
      id: 25,
      text: `Users agree to indemnify, defend, and hold harmless SipLine, its affiliates, officers, agents, and employees from all claims, liabilities, damages, and expenses (including attorney’s fees) arising out of the users:\n- Misuse of the Services\n- Violation of these Terms\n- Violation of any applicable law or third-party right`,
    },

    {id: 26, text: '13. Dispute Resolution'},
    {
      id: 27,
      text: `a. Informal Process:\nPlease contact us first with any concerns. We strive to resolve disputes amicably.\n\nb. Arbitration Agreement:\nIf unresolved, users agree to resolve all disputes through binding arbitration conducted in Louisville, Kentucky, under the rules of the American Arbitration Association (AAA). Users waive the right to participate in any class action or jury trial.\n\nc.  Jurisdiction-Specific Rights:\nIf users reside outside the U.S., local consumer rights may apply and may override certain arbitration clauses.`,
    },

    {id: 28, text: '14. Governing Law'},
    {
      id: 29,
      text: `These Terms and any disputes will be governed exclusively by the laws of the Commonwealth of Kentucky, without regard to conflict-of-law principles.`,
    },

    {id: 30, text: '15. Changes to Terms'},
    {
      id: 31,
      text: `We may revise these Terms at any time. Material changes will be announced via email or app notification. Continued use of the Services after changes constitutes users’ agreement to the new terms.`,
    },

    {id: 32, text: '16. Contact Us'},
    {
      id: 33,
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
          title="Terms & Conditions"
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
                    textAlign: 'justify',
                    fontSize: responsiveFontSize(1.7),
                    fontWeight: item.text.match(
                      /^(\d+\.|[a-z]\.|Terms|Refund Policy)/,
                    )
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

export default Terms;
