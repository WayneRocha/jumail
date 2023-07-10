import { configureStore } from '@reduxjs/toolkit';

import listManagerReducer from './features/list-manager';
import uiReducer from './features/ui';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    listManager: listManagerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

