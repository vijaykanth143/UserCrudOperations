import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Font from '../Style/Font';
import Colors from '../Style/Colors';

const FloatingLableInput = props => {
  const [isFocused, setFocused] = useState(false);
  console.log(props.value, 'props');
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: !isFocused && props.value === '' ? 20 : 5,
    Fontize: 14,
    fontFamily: Font.medium.fontFamily,
    color: '#aaa',
    //fontWeight: 200,
  };
  return (
    <View style={{paddingTop: 13, marginTop: isFocused ? props.mv : 10}}>
      <Text style={[labelStyle, Font.regular]}>{props.label}</Text>

      <TextInput
        maxLength={props.maxLength}
        {...props}
        style={{
          height: 40,
          Fontize: 15,
          color: Colors.blackclr.color,
          borderBottomWidth: 1,
          borderBottomColor: '#111551',
          width: '100%',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {props.image ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: 20,
          }}
          onPress={() => props.onPress()}>
          <Image
            source={props.image}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default FloatingLableInput;

const styles = StyleSheet.create({});
