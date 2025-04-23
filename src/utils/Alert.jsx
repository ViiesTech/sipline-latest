import { ActivityIndicator, Alert, Dimensions, Image, Platform, Text, View } from "react-native";
import { Color } from "./Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { H5, Pera } from "./Text";
import moment from "moment-timezone";
const { height } = Dimensions.get('window');

export const Message = (title, message, buttons) => {
    return Alert.alert(title, message, buttons);
}

export const LoadingAnimation = () => {

    return (
        <View style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }], height: height * 0.9, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 70} color={Color("text")} />
        </View>
    );
}

export const NoResultFound = () => {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <H5 bold>~ Oops ~</H5>
            <Pera>No Results Found</Pera>
            <Image source={{ uri: 'https://i.imghippo.com/files/wNG9J1729034425.jpg' }} style={{width:wp('50%'),height:hp('50%')}} resizeMode="contain" />
        </View>
    )
}


export const timeAndDate = (createdAt) => {
    const startTime = moment(createdAt);
    const endTime = moment();
    const duration = moment.duration(endTime.diff(startTime));
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    const dt = months > 0 ? `${months}m` : days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : minutes > 0 ? `${minutes}m` : 'Just Now';
    return dt;
}

export const CustomToastView = (title) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={require('../assets/images/splash.png')}
                style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <Text>{title}</Text>
        </View>
    );
}

export async function getServiceType(number) {
    // visa
    var re = new RegExp('^4');
    if (number.match(re) != null) { return 'visa'; }

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) { return 'mastercard'; }

    // AMEX
    re = new RegExp('^3[47]');
    if (number.match(re) != null) { return 'amex'; }

    // Discover
    re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
    if (number.match(re) != null) { return 'discover'; }

    // Diners
    re = new RegExp('^36');
    if (number.match(re) != null) { return 'diners'; }

    // Diners - Carte Blanche
    re = new RegExp('^30[0-5]');
    if (number.match(re) != null) { return 'diners - carte blanche'; }

    // JCB
    re = new RegExp('^35(2[89]|[3-8][0-9])');
    if (number.match(re) != null) { return 'jcb'; }

    // Visa Electron
    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) != null) { return 'visa electron'; }

    return '';
}

export async function getCardType(cardNumber) {
    // Regular expressions for credit and debit card numbers
    const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    const debitCardRegex = /^(?:5018|5020|5038|6304|6759|6761|6762|6763|0604|6390)\d{8,15}$/;

    // Check if card number matches credit card regex
    if (creditCardRegex.test(cardNumber)) {
        return 'credit';
    }
    // Check if card number matches debit card regex
    else if (debitCardRegex.test(cardNumber)) {
        return 'debit';
    }
    // If none of the above match, return unknown
    else {
        return 'unknown';
    }
}

export function encryption(text, key) {
    const result = [];
    for (let i = 0; i < text?.length; i++) {
        result.push(text?.charCodeAt(i) ^ key?.charCodeAt(i % key?.length));
    }
    return String?.fromCharCode(...result);
}                            

