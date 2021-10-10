import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

import {loginUser, logoutUser} from '../../state/actions/UserAction';
import {useTypedSelector} from '../../state/reducers/RootReducer';

interface LoginScreenProps {
  useEffectHook: any;
  text: string;
  setText: Function;
  googleIcon: any;
  dispatch: Function;
  user: any;
}

const LoginScreen = () => {
  const googleIcon = <Icon name="google" size={30} />;
  const [text, setText] = useState('Login to use SuperChat');
  const dispatch = useDispatch();
  const user = useTypedSelector(state => state.UserReducer);
  return (
    <LoginScreenProps
      useEffectHook={useEffect}
      text={text}
      setText={setText}
      googleIcon={googleIcon}
      dispatch={dispatch}
      user={user}
    />
  );
};

export const LoginScreenProps = (props: LoginScreenProps) => {
  const {useEffectHook, text, setText, googleIcon, dispatch, user} = props;

  const onGooglePress = () => {
    dispatch(loginUser({userId: '1', userEmail: 'abc@gmail.com'}));
  };

  // useEffectHook(() => {
  //   if (user.userEmail) {
  //     setText(user.userEmail);
  //   }
  // }, [user]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{text}</Text>
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
  text: {
    fontFamily: 'nunito',
    fontWeight: '700',
    fontSize: 15,
    margin: 10,
  },
});
