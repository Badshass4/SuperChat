import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
  UserReducer,
});

export default RootReducer;

export type Rootstate = ReturnType<typeof RootReducer>;
export const useTypedSelector: TypedUseSelectorHook<Rootstate> = useSelector;
