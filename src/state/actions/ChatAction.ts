import {SEND_CHAT} from '../constants/Chat';
import Chat from '../../models/ChatModel';

export const sendChat = (payload: Chat) => ({
  type: SEND_CHAT,
  payload,
});

export type ChatActions = ReturnType<typeof sendChat>;
