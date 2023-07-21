import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Colors from '../Style/Colors';
import Font from '../Style/Font';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ButtonComp = ({
  title,
  onPress = () => {},
  buttonStyle,
  textStyle,
  icon,
  iconStyle,
  height,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
        }}>
        {!!icon ? (
          <View style={iconStyle}>
            {/* <Icon
                            name={icon}
                            size={30}
                            color={colors.whiteColor2Text}
                             /> */}
            <Image
              source={icon}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          </View>
        ) : null}
        <Text style={[textStyle, Font.bold]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComp;
