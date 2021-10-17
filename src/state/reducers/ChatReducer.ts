import {SEND_CHAT} from '../constants/Chat';
import {ChatActions} from '../actions/ChatAction';
import Messages from '../../models/ChatModel';

const initialState: Messages = {
  messages: [],
};

export default (state = initialState, action: ChatActions) => {
  switch (action.type) {
    case SEND_CHAT:
      const newMsg = [...state.messages];
      newMsg.push(action.payload);
      return {
        ...state,
        messages: newMsg,
      };
    default:
      return state;
  }
};
