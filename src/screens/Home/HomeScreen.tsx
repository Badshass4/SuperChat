import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTypedSelector} from '../../state/reducers/RootReducer';
import {logoutUser} from '../../state/actions/UserAction';

interface HomeScreenProps {
  user: any;
  dispatch: Function;
  navigation: any;
  useEffectHook: Function;
}

const HomeScreen = () => {
  const user = useTypedSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <HomeScreenProps
      user={user}
      dispatch={dispatch}
      navigation={navigation}
      useEffectHook={useEffect}
    />
  );
};

export const HomeScreenProps = (props: HomeScreenProps) => {
  const {user, dispatch, navigation, useEffectHook} = props;
  const {userEmail} = user;

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
      //   setloggedIn(false);
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
    <View>
      <Text>{user.userEmail}</Text>
      <Button onPress={signOut} title="LogOut" color="red" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
