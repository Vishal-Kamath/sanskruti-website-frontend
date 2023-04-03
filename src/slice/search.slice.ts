import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Tags } from '@/model/item.model';

type SeacrhType = {
  searchInput: string;
  tags: Tags;
};

// Define the initial state using that type
const initialState: SeacrhType = {
  searchInput: '',
  tags: {},
};

export const search = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    clearTags: (state) => {
      state.tags = {};
    },
    setTags: (state, action: PayloadAction<Tags>) => {
      state.tags = action.payload;
    },
  },
});

export const { clearTags, setTags, setSearchInput } = search.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTagCategory = (category: keyof Tags) => (state: RootState) =>
  state.search.tags[category];
export const selectAllTags = (state: RootState) => state.search.tags;
export const selectSearchInput = (state: RootState) => state.search.searchInput;

export default search.reducer;
