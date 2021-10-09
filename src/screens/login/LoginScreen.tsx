import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface LoginScreenProps {
  useEffectHook: any;
  text: string;
  setText: Function;
}

const LoginScreen = () => {
  const [text, setText] = useState('Hello from Login Screen');
  return (
    <LoginScreenProps useEffectHook={useEffect} text={text} setText={setText} />
  );
};

export const LoginScreenProps = (props: LoginScreenProps) => {
  const {useEffectHook, text, setText} = props;

  return (
    <View style={styles.mainContainer}>
      <Text>{text}</Text>
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
});
