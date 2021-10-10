import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LoginScreenProps {
  useEffectHook: any;
  text: string;
  setText: Function;
  googleIcon: any;
}

const LoginScreen = () => {
  const [text, setText] = useState('Hello from Login Screen');
  const googleIcon = <Icon name="google" size={30} />;
  return (
    <LoginScreenProps
      useEffectHook={useEffect}
      text={text}
      setText={setText}
      googleIcon={googleIcon}
    />
  );
};

export const LoginScreenProps = (props: LoginScreenProps) => {
  const {useEffectHook, text, setText, googleIcon} = props;

  const onGooglePress = () => {
    console.log('google');
  };

  return (
    <View style={styles.mainContainer}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={onGooglePress}>
        <View style={styles.iconView}>
          {googleIcon}
          <Text style={styles.googleText}>oogle</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleText: {
    fontSize: 28,
  },
});
