import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../..';

export interface UIState {
  userName: string | null,
  userEmail: string | null,
  activeList: string | null,
  activeEmailCard: string | null,
  editorContent: {[listId: string]: string}
}

const initialState: UIState = {
  userName: window.localStorage.getItem("ui.user_name") || null,
  userEmail: window.localStorage.getItem("ui.user_email") || null,
  activeList: window.localStorage.getItem("ui.activeList") || null,
  activeEmailCard: window.localStorage.getItem("ui.emailCardActive") || null,
  editorContent: JSON.parse(window.localStorage.getItem("ui.editorContent") || "{}")
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveList: (state, action: PayloadAction<string>) => {
      state.activeList = action.payload;
      window.localStorage.setItem("ui.activeList", action.payload);
    },
    setActiveEmailCard: (state, action: PayloadAction<string | null>) => {
      state.activeEmailCard = action.payload;
      
      if (action.payload !== null) {
        window.localStorage.setItem("ui.emailCardActive", action.payload);
      } else {
        window.localStorage.removeItem("ui.emailCardActive");
      }
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
      window.localStorage.setItem("ui.user_email", action.payload);
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      window.localStorage.setItem("ui.user_name", action.payload);
    },
    setEditorContent: (state, action: PayloadAction<{listId: string, content: string}>) => {
      state.editorContent[action.payload.listId] = action.payload.content;

      window.localStorage.setItem("ui.editorContent", JSON.stringify(state.editorContent));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveList,
  setActiveEmailCard,
  setUserEmail,
  setUserName,
  setEditorContent,
} = uiSlice.actions;

export const selectActiveList = (state: RootState) => state.ui.activeList;
export const selectActiveEmailCard = (state: RootState) => state.ui.activeEmailCard;
export const selectUserEmail = (state: RootState) => state.ui.userEmail;
export const selectUserName = (state: RootState) => state.ui.userName;
export const selectEditorContent = (state: RootState) => state.ui.editorContent;

export default uiSlice.reducer;
