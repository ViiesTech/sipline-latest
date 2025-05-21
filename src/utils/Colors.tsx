import { Appearance } from 'react-native';

interface Colors {
    [key: string]: string | undefined
}

// COLORS FOR THE DARK THEME
const darkColorScheme: Colors = {
    text: '#000000',
    modelBackground: 'rgba(0, 0, 0, 0.5)',
    modelBackgroundDark: 'rgba(0, 0, 0, 0.8)',
    headerIconBg: '#2F620B',
    headerIcon: '#ffffff',
    ratingStar: '#FDB71A',
    inputIcons: '#717171',
    mapSearchBorder: 'gray',
    starClr:'#FFD700',
    orderPlacedTick: '#00BA00',
    searchBorder:'#041E5E',
    deleteSearch:"#292929"
};

// COLORS FOR THE LIGHT THEME
const lightColorScheme: Colors = {
    text: '#000000',
    modelBackground: 'rgba(0, 0, 0, 0.5)',
    modelBackgroundDark: 'rgba(0, 0, 0, 0.8)',
    headerIconBg: '#2F620B',
    headerIcon: '#ffffff',
    ratingStar: '#FDB71A',
    inputIcons: '#717171',
    mapSearchBorder: 'gray',
    starClr:'#FFD700',
    orderPlacedTick: '#00BA00',
    searchBorder:'#041E5E',
    deleteSearch:"#292929",
    red:'red',

};

export const Color = (color: string) => {
    // GET USER DEVICE THEME (LIGHT/DARK)
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme === 'dark') {           // IF USER DEVICE THEME IS DARK
        return darkColorScheme[color];
    }else {                                 // IF USER DEVICE THEME IS LIGHT
        return lightColorScheme[color];
    }
};
