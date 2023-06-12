import { configureStore, combineReducers } from '@reduxjs/toolkit'
import taskReducer from './features/task'

import {
  persistStore,
  persistReducer
} from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'

const reducer = combineReducers({
  task: taskReducer
})

const persistConfig = {
  key: 'main-root2',
  storage
}

const rootReducer = (state, action) => {
  return reducer(state, action)
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer,
    preloadedState
  })
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)
