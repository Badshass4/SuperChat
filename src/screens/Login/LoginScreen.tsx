import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {loginUser} from '../../state/actions/UserAction';
import {useTypedSelector} from '../../state/reducers/RootReducer';

interface LoginScreenProps {
  useEffectHook: any;
  text: string;
  setText: Function;
  dispatch: Function;
  navigation: any;
  user: any;
  loggedIn: any;
  setloggedIn: Function;
}

const LoginScreen = () => {
  const [text, setText] = useState('Login to SuperChat');
  const [loggedIn, setloggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useTypedSelector(state => state.UserReducer);
  return (
    <LoginScreenProps
      useEffectHook={useEffect}
      text={text}
      setText={setText}
      dispatch={dispatch}
      navigation={navigation}
      user={user}
      loggedIn={loggedIn}
      setloggedIn={setloggedIn}
    />
  );
};

export const LoginScreenProps = (props: LoginScreenProps) => {
  const {
    useEffectHook,
    text,
    setText,
    dispatch,
    navigation,
    user,
    setloggedIn,
  } = props;

  const {userEmail} = user;

  useEffectHook(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '721062517045-85pjrc95p8k9ppc0hj2k3j493oqna6qj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  async function signIn() {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(
      '<================== LoginScreen ==> sign in complete ====================>',
    );
    const payload = {
      userId: userInfo.user.id,
      userEmail: userInfo.user.email,
      userName: userInfo.user.name,
    };
    dispatch(loginUser(payload));
    setloggedIn(true);
  }
  async function silentSignIn() {
    const userInfo = await GoogleSignin.signInSilently();
    console.log(
      '<================== LoginScreen ==> silent Sign in complete ====================>',
    );
    const payload = {
      userId: userInfo.user.id,
      userEmail: userInfo.user.email,
      userName: userInfo.user.name,
    };
    dispatch(loginUser(payload));
  }

  useEffectHook(() => {
    async function isUserSignedIn() {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn && userEmail === null) {
        silentSignIn();
      }
    }
    isUserSignedIn();
    if (userEmail) {
      navigation.navigate('Home');
    }
  }, [userEmail]);

  const onGooglePress = async () => {
    try {
      signIn();
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('LoginScreen ==> SIGN_IN_REQUIRED');
        signIn();
      } else {
        // some other error happened
        Alert.alert(error);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onGooglePress}>
        <GoogleSigninButton
          style={styles.googleBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
        />
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
  googleBtn: {
    width: 192,
    height: 48,
  },
  text: {
    fontFamily: 'nunito',
    fontWeight: '700',
    fontSize: 20,
    margin: 10,
  },
});
