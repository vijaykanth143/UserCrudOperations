import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Overlay} from 'react-native-elements';
import Font from '../Style/Font';
import FloatingLableInput from './FloatingLableInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonComp from './ButtonComp';
const PopUp = ({
  alertVisible,
  Des,
  id,
  ButtonName1,
  ButtonName2,
  onBackdropPress,
  onChangeTitle,
  Data,
  onChangeBody,
  handle,
  popUpName,
  ButtonName,
}) => {
  return popUpName === 'Delete Data' ? (
    <Overlay
      backdropStyle={{
        backgroundColor: '#00000080',
      }}
      overlayStyle={{
        borderRadius: 10,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      }}
      animationType="fade"
      isVisible={alertVisible}
      onBackdropPress={onBackdropPress}>
      <View style={{backgroundColor: 'white', borderRadius: 10}}>
        <View
          style={{
            backgroundColor: '#111551',
            padding: 2,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <Text
            style={[
              Font.bold,
              Font.medium,
              {
                color: 'white',
                marginVertical: 15,
                textAlign: 'center',
              },
            ]}>
            {popUpName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            //backgroundColor: colors.backgroundSecondary,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            width: wp('83.33%'),
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text
              style={[
                Font.bold,
                Font.medium,
                {
                  color: 'black',
                  marginVertical: 15,
                  textAlign: 'center',
                },
              ]}>
              {Des}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 25,
              marginVertical: hp(1),
            }}>
            <ButtonComp
              title={ButtonName1}
              onPress={handle}
              buttonStyle={[styles.buttonStyle, {width: wp(24)}]}
              textStyle={[Font.semibold, Font.medium, {color: '#ffffff'}]}
            />
            <ButtonComp
              title={ButtonName2}
              onPress={onBackdropPress}
              buttonStyle={[styles.buttonStyle, {width: wp(24)}]}
              textStyle={[Font.semibold, Font.medium, {color: '#ffffff'}]}
            />
          </View>
        </View>
      </View>
    </Overlay>
  ) : (
    <Overlay
      backdropStyle={{
        backgroundColor: '#00000080',
      }}
      overlayStyle={{
        borderRadius: 10,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
      }}
      animationType="fade"
      isVisible={alertVisible}
      onBackdropPress={onBackdropPress}>
      <View style={{backgroundColor: 'white', borderRadius: 10}}>
        <View
          style={{
            backgroundColor: '#111551',
            padding: 2,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <Text
            style={[
              Font.bold,
              Font.medium,
              {
                color: 'white',
                marginVertical: 15,
                textAlign: 'center',
              },
            ]}>
            {popUpName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            //backgroundColor: colors.backgroundSecondary,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            width: wp('83.33%'),
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <FloatingLableInput
              label="Title"
              value={Data?.title}
              onChangeText={onChangeTitle}
            />
            <FloatingLableInput
              label="body"
              value={Data?.body}
              onChangeText={onChangeBody}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 25,
              marginVertical: hp(1),
            }}>
            <ButtonComp
              title={ButtonName}
              onPress={handle}
              buttonStyle={styles.buttonStyle}
              textStyle={[Font.semibold, Font.medium, {color: '#ffffff'}]}
            />
          </View>
        </View>
      </View>
    </Overlay>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#111551',
    width: '60%',
    alignSelf: 'center',
    paddingVertical: hp(1),
    borderRadius: 15,
  },
});
