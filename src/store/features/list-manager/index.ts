'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../..';
import { DEFAULT_LISTSET } from '@/constants';

export interface Variable {
  id: string,
  prop: string,
  value: string
}

export interface Email {
  id: string,
  address: string,
  variables: Variable[]
}

export interface List {
  id: string;
  name: string;
  variables: Variable[];
  emails: Email[];
}

export interface ListManagerState {
  lists: List[] 
}

const getServerSideInitialState = (): ListManagerState => ({
  lists: []
});

const getClientSideInitialState = (): ListManagerState => ({
  lists: JSON.parse(window.localStorage.getItem("listManager.lists") || JSON.stringify(DEFAULT_LISTSET))
});

const initialState: ListManagerState = typeof window !== "undefined" ? getClientSideInitialState() : getServerSideInitialState();

export const listManagerSlice = createSlice({
  name: 'listManager',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<List>) => {
      let index = state.lists.findIndex(l => l.id === action.payload.id);

      if (index === (-1)) {
        return;
      }

      state.lists[index] = action.payload;

      window.localStorage.setItem("listManager.lists", JSON.stringify(state.lists));
    },
    setLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;

      window.localStorage.setItem("listManager.lists", JSON.stringify(action.payload));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setList,
  setLists
} = listManagerSlice.actions;

export const selectLists = (state: RootState) => state.listManager.lists;
export const selectList = (state: RootState) => {
  const id = state.ui.activeList;
  const list = state.listManager.lists.find((list) => list.id === id)
  return list || null;
};

export default listManagerSlice.reducer;
