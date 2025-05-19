import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thucnkMiddleware from 'redux-thunk';  // Đổi tên biến cho rõ ràng
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer);




export const persistor = persistStore(store);