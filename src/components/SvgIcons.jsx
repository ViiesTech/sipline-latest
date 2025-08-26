import * as React from 'react';
import { View } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { responsiveHeight } from '../utils/Responsive';

interface svgprops {
  width: number,
  height: number,
  xml: string,
  color?: string,
  align?: 'flex-start' | 'center' | 'flex-end';
  mrgnTop?:number;
}

export default ({ width,mrgnTop, height, xml, color, align }: svgprops) => (
  <View style={{ alignItems: align,marginTop:responsiveHeight(mrgnTop) }}>
    <SvgFromXml color={color} width={width} height={height} xml={xml} />
  </View>
);
