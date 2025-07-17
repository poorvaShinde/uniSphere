
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface HackathonsState {
  hackathons: Hackathon[];
  loading: boolean;
  error: string | null;
}

const initialState: HackathonsState = {
  hackathons: [],
  loading: false,
  error: null,
};

export const fetchHackathons = createAsyncThunk('hackathons/fetchHackathons', async () => {
  const querySnapshot = await getDocs(collection(db, 'hackathons'));
  const hackathons = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Hackathon));
  return hackathons;
});

const hackathonsSlice = createSlice({
  name: 'hackathons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHackathons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHackathons.fulfilled, (state, action: PayloadAction<Hackathon[]>) => {
        state.loading = false;
        state.hackathons = action.payload;
      })
      .addCase(fetchHackathons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch hackathons';
      });
  },
});

export default hackathonsSlice.reducer;
