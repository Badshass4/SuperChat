import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useTypedSelector} from '../state/reducers/RootReducer';
import {logoutUser} from '../state/actions/UserAction';

interface HeaderProps {
  user: any;
  dispatch: Function;
  navigation: any;
  useEffectHook: Function;
}

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useTypedSelector(state => state.UserReducer);
  return (
    <HeaderProps
      user={user}
      dispatch={dispatch}
      navigation={navigation}
      useEffectHook={useEffect}
    />
  );
};

export const HeaderProps = (props: HeaderProps) => {
  const {user, dispatch, navigation, useEffectHook} = props;
  const {userEmail, userName} = user;

  useEffectHook(() => {
    if (userEmail === null || userEmail === undefined) {
      console.log('HomeScreen ==> going to Login');
      navigation.navigate('Login');
    }
  }, [userEmail]);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(logoutUser());
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('HomeScreen ==> SIGN_IN_REQUIRED');
      } else {
        console.log('HomeScreen ==> ', error);
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.nameText}>{userName}</Text>
      <Icon name="user-circle" size={25} onPress={signOut} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'nunito',
    fontWeight: '700',
  },
});
