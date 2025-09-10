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
      text: `SipLine offers recurring subscriptions with VIP perks such as discounts, expedited service, and early access to exclusive events.\n\n- Subscriptions auto-renew at the beginning of each billing cycle based on the original purchase date, unless canceled beforehand.\n- Fees are non-refundable after renewal.\n- Users may cancel at any time via account settings; benefits will remain active through the paid period.\n- SipLine reserves the right to adjust subscription pricing from time to time to reflect changes in operational costs. Users will be notified of any such changes at least 30 days in advance. Continued use of the service after the effective date constitutes acceptance.`,
    },

    {id: 14, text: '7. Prohibited Conduct'},
    {
      id: 15,
      text: `Users may not:\n- Use the Services for any unlawful, harmful, or fraudulent purpose\n- Violate any laws regarding alcohol consumption\n- Interfere with the operation of the App or any venue\n- Attempt to scrape, reverse engineer, or duplicate SipLine technology\n\nViolation may result in permanent suspension and reporting to authorities.`,
    },

    {id: 16, text: '8. Partner Venue Responsibility'},
    {
      id: 17,
      text: `Partner venues are solely responsible for:\n- Preparing and serving drinks correctly, as ordered\n- Complying with all liquor laws, including ID and age verification\n- Handling any customer service issues related to drink preparation or service\n- Selecting and maintaining the quality of liquor brands offered through SipLine\n\nSipLine is not liable for venue-related failures but will assist in dispute resolution when contacted within 24 hours.`,
    },

    {id: 18, text: '9. Refunds & Cancellations'},
    {
      id: 19,
      text: `Refund Policy:\n- Full refunds are only available prior to drink preparation.\n- Once a beverage is marked “Picked Up” or confirmed as made, refund requests will be case by case.\n- Venue-approved refunds release SipLine from obligations.\n- Refunds may take 5–10 business days.\n- Abuse of refund policy may result in suspension.\n\nRefunds may be issued when:\n- At bartender/venue discretion\n- Venue denies entry\n- Requested beverage unavailable`,
    },

    {id: 20, text: '10. Intellectual Property'},
    {
      id: 21,
      text: `All trademarks, logos, app content, software, text, graphics, and branding are owned or licensed to SipLine.\n\nUsers may not copy, distribute, reproduce, modify, or commercially exploit this content without express permission. Screen scraping or unauthorized use will result in liability.`,
    },

    {id: 22, text: '11. Disclaimers & Limitation of Liability'},
    {
      id: 23,
      text: `a. Disclaimer:\nThe Services are provided “as is” and “as available.” SipLine disclaims all express or implied warranties.\n\nb. Limitation of Liability:\nSipLine’s liability shall not exceed the transaction amount in dispute. We are not liable for:\n- Missed pickup windows\n- Incorrect drink preparation\n- Venue delays\n- Indirect or consequential damages`,
    },

    {id: 24, text: '12. Indemnification'},
    {
      id: 25,
      text: `Users agree to indemnify and hold harmless SipLine, affiliates, officers, and employees from claims, damages, and expenses arising from:\n- Misuse of Services\n- Violation of Terms\n- Violation of law or third-party rights`,
    },

    {id: 26, text: '13. Dispute Resolution'},
    {
      id: 27,
      text: `a. Informal Process:\nPlease contact us first with any concerns.\n\nb. Arbitration Agreement:\nUnresolved disputes shall be resolved by binding arbitration in Louisville, Kentucky, under AAA rules. Users waive class action and jury trial rights.\n\nc. Jurisdiction-Specific Rights:\nIf outside the U.S., local consumer rights may override certain clauses.`,
    },

    {id: 28, text: '14. Governing Law'},
    {
      id: 29,
      text: `These Terms are governed exclusively by the laws of the Commonwealth of Kentucky, without regard to conflict-of-law principles.`,
    },

    {id: 30, text: '15. Changes to Terms'},
    {
      id: 31,
      text: `We may revise Terms at any time. Material changes will be communicated via email or app notifications. Continued use constitutes agreement.`,
    },

    {id: 32, text: '16. Contact Us'},
    {
      id: 33,
      text: `For questions or concerns, email us:\n📧 info@khrenterprize.com\n\nSipLine does not provide phone support. All communications must be via email for record-keeping and legal purposes.`,
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
