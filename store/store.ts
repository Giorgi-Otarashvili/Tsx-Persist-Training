import { configureStore } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { rootReducer, RootState } from './rootReducer'; 
import { 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = { 
  key: 'root', 
  storage: AsyncStorage,
  version: 1,
}; 
 
const persistedReducer = persistReducer(persistConfig, rootReducer); 
 
export const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}); 
 
export const persistor = persistStore(store); 
 
export type AppDispatch = typeof store.dispatch;