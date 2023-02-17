import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import todosReducer  from '../features/todos/todosSlice';
import userLoginReducer from '../features/login/userLoginSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY as string,
      onError: function (error) {
        console.log(error)
      },
    }),
  ],
}

const rootReducer = combineReducers({
  todos: todosReducer,
  userLogin: userLoginReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store)