import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {io} from 'socket.io-client';

import {useTypedSelector} from '../../state/reducers/RootReducer';
import {sendChat} from '../../state/actions/ChatAction';

interface ChatScreenProps {
  user: any;
  messages: any;
  dispatch: Function;
  navigation: any;
  useEffectHook: Function;
  msg: any;
  setMsg: Function;
  msgState: any;
  setMsgState: Function;
  flatlistRef: any;
  socket: any;
  setSocket: Function;
}

const ChatScreen = () => {
  const user = useTypedSelector(state => state.UserReducer);
  const {messages} = useTypedSelector(state => state.ChatReducer);
  const [msgState, setMsgState] = useState(messages);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [msg, setMsg] = useState('');
  const flatlistRef = useRef();

  return (
    <ChatScreenProps
      user={user}
      messages={messages}
      dispatch={dispatch}
      navigation={navigation}
      useEffectHook={useEffect}
      msg={msg}
      setMsg={setMsg}
      msgState={msgState}
      setMsgState={setMsgState}
      flatlistRef={flatlistRef}
      socket={socket}
      setSocket={setSocket}
    />
  );
};

export const ChatScreenProps = (props: ChatScreenProps) => {
  const {
    user,
    messages,
    msgState,
    setMsgState,
    dispatch,
    navigation,
    useEffectHook,
    msg,
    setMsg,
    flatlistRef,
    socket,
    setSocket,
  } = props;
  const {userEmail} = user;

  // useEffect(() => {
  //   const sock = io('http://192.168.0.187:3000', {
  //     transports: ['websocket'],
  //     jsonp: false,
  //   });
  //   sock.connect();
  //   sock.on('connect', () => {
  //     console.log('connected to socket server');
  //   });
  //   setSocket(sock);
  // }, []);

  useEffectHook(() => {
    // console.log(msgState);
    scrollToEnd();
  }, [msgState]);

  const onChangeInput = (e: any) => {
    setMsg(e);
  };

  const onSendPress = async () => {
    if (msg) {
      const payload = {
        userId: userEmail,
        msgId: Math.round(Math.random() * 1000000).toString(),
        msg,
      };
      const newMsgState = [...msgState];
      newMsgState.push(payload);
      await setMsgState(newMsgState);
      await dispatch(sendChat(payload));
      console.log('onSendPress : ', msgState);
      setMsg('');
      scrollToEnd();
      // socket.emit('chat_message', msg);
    }
  };

  const scrollToEnd = () => {
    flatlistRef.current.scrollToEnd({animating: true});
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.msgCard}>
        <Text style={styles.msg}>{item.msg}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.msgView}>
        <FlatList
          ref={flatlistRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.msgId}
          ListFooterComponent={item => {
            return <View style={{height: 40}}></View>;
          }}
          initialScrollIndex={messages.length - 1}
        />
      </View>
      <View style={styles.sendMsgSection}>
        <TextInput
          onChangeText={e => onChangeInput(e)}
          placeholder="Start Typing..."
          style={styles.textInput}
          value={msg}
          onPressIn={scrollToEnd}
        />
        <Icon
          name="send"
          size={20}
          onPress={onSendPress}
          style={{paddingRight: 10}}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textInput: {
    height: 40,
    width: '91%',
    paddingHorizontal: 10,
  },
  sendMsgSection: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    borderColor: '#000d1a',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    // maxWidth: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
    left: 3,
  },
  msg: {
    fontFamily: 'nunito',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  msgView: {
    // flex: 1,
    padding: 10,
  },
  msgCard: {
    borderRadius: 15,
    backgroundColor: 'limegreen',
    padding: 10,
    paddingHVertical: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
});
