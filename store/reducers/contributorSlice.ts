import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// Define your data types
interface ContributorState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ContributorState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching data
export const fetchContributors = createAsyncThunk(
  'contributors/fetchContributors',
  async () => {
    const response = await api.get('/api/contributors');
    return response.data;
  }
);

export const newContributor = createAsyncThunk(
  'contributors/newContributor',
  async (contributor: any) => {
    const response = await api.post('/api/contributors/new', contributor);
    return response.data;
  }
);
export const pinContributor = createAsyncThunk(
  'contributors/pinContributor',
  async (contributor: any) => {

    const response = await api.post('/api/contributors/pin', contributor);
    return response.data;
  }
)
export const unPinContributor = createAsyncThunk(
  'contributors/unPinContributor',
  async (contributor: any) => {
    const response = await api.post('/api/contributors/unPin', contributor);
    return response.data;
  }
)

export const upRankContributor = createAsyncThunk(
  'contributors/upRankContributor',
  async (contributor: any) => {
    const response = await api.post('/api/contributors/upRank', contributor);
    return response.data;
  }
)

export const downRankContributor = createAsyncThunk(
  'contributors/downRankContributor',
  async (contributor: any) => {
    const response = await api.post('/api/contributors/downRank', contributor);
    return response.data;
  }
)

const contributorSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContributors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.error = null;
      })
      .addCase(fetchContributors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(newContributor.pending, (state) => {
        state.loading = true;
      })
      .addCase(newContributor.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(newContributor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(pinContributor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContributors = action.payload.data; // Assuming the server returns the updated contributors
        state.items = state.items.map(item =>
          updatedContributors.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortContributors(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(pinContributor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(unPinContributor.pending, (state) => {
        state.loading = true;
      })
      .addCase(unPinContributor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContributors = action.payload.data; // Assuming the server returns the updated contributors
        state.items = state.items.map(item =>
          updatedContributors.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortContributors(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(unPinContributor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(upRankContributor.pending, (state) => {
        state.loading = true;
      })
      .addCase(upRankContributor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContributors = action.payload.data; // Assuming the server returns the updated contributors
        state.items = state.items.map(item =>
          updatedContributors.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortContributors(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(upRankContributor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(downRankContributor.pending, (state) => {
        state.loading = true;
      })
      .addCase(downRankContributor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContributors = action.payload.data; // Assuming the server returns the updated contributors
        state.items = state.items.map(item =>
          updatedContributors.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortContributors(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(downRankContributor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
const sortContributors = (contributors: any[]) => {
  return contributors.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured - a.isFeatured; // Featured contributors first
    }
    if (a.isFeatured) {
      return a.featureRank - b.featureRank; // Sort featured contributors by featureRank
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort remaining contributors by createdAt
  });
};
export default contributorSlice.reducer;