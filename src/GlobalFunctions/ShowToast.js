import Toast from 'react-native-toast-message';

export const ShowToast = (type, text,text2) => {
  return Toast.show({
    type: type,
    text1: text,
    text2:text2,
  });
};
