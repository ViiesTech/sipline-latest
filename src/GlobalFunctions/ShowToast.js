import Toast from 'react-native-toast-message';

export const ShowToast = (type, text) => {
  return Toast.show({
    type: type,
    text1: text,
  });
};
