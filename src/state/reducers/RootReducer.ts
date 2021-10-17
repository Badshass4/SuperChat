import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';

const RootReducer = combineReducers({
  UserReducer,
  ChatReducer,
});

export default RootReducer;

export type Rootstate = ReturnType<typeof RootReducer>;
export const useTypedSelector: TypedUseSelectorHook<Rootstate> = useSelector;
