/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color} from '../utils/Colors';
import {Pera} from '../utils/Text';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SegmentTab = ({
  options,
  isHorizontal,
  onPress,
  selectedVal,
  ...props
}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={isHorizontal || true}
      {...props}>
      <View style={disCountStyles.optionContiner}>
        {options?.map((item, index) => {
          console.log('item', item);
          return (
            <TouchableOpacity key={index} onPress={() => onPress(item)}>
              <Pera
                style={{
                  color: options.includes(selectedVal)
                    ? item === selectedVal
                      ? Color('text')
                      : Color('mapSearchBorder')
                    : index === 0
                    ? Color('text')
                    : Color('mapSearchBorder'),
                }}>
                {item === 'Delivered'
                  ? 'Received'
                  : item?.charAt(0).toUpperCase() + item?.slice(1)}
              </Pera>
              {options.includes(selectedVal)
                ? item === selectedVal && (
                    <View style={disCountStyles.selectedLine} />
                  )
                : index === 0 && <View style={disCountStyles.selectedLine} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const disCountStyles = StyleSheet.create({
  optionContiner: {
    flexDirection: 'row',
    gap: hp('2.5%'),
  },
  selectedLine: {
    borderWidth: 1,
    borderColor: Color('ratingStar'),
    marginTop: hp('2%'),
  },
});
export default SegmentTab;
