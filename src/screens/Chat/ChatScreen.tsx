import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTypedSelector} from '../../state/reducers/RootReducer';

interface ChatScreenProps {
  user: any;
  dispatch: Function;
  navigation: any;
  useEffectHook: Function;
}

const ChatScreen = () => {
  const user = useTypedSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ChatScreenProps
      user={user}
      dispatch={dispatch}
      navigation={navigation}
      useEffectHook={useEffect}
    />
  );
};

export const ChatScreenProps = (props: ChatScreenProps) => {
  const {user, dispatch, navigation, useEffectHook} = props;
  const {userEmail} = user;

  return (
    <View>
      <Text>{user.userEmail}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
