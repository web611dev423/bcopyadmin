import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// Define your data types
interface ProgramState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgramState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching data
export const fetchPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async () => {
    const response = await api.get('/api/programs');
    return response.data;
  }
);

export const acceptProgram = createAsyncThunk(
  'programs/acceptProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/accept', { id: program });
    return response.data;
  }
);

export const rejectProgram = createAsyncThunk(
  'programs/rejectProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/reject', { id: program });
    return response.data;
  }
);

export const fetchStatus = createAsyncThunk(
  'programs/fetchStatus',
  async (program: any) => {
    const response = await api.post('/api/programs/status', { id: program });
    return response.data;
  }
);
export const pinProgram = createAsyncThunk(
  'programs/pinProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/pin', program);
    return response.data;
  }
)
export const unPinProgram = createAsyncThunk(
  'programs/unPinProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/unPin', program);
    return response.data;
  }
)

export const upRankProgram = createAsyncThunk(
  'programs/upRankProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/upRank', program);
    return response.data;
  }
)

export const downRankProgram = createAsyncThunk(
  'programs/downRankProgram',
  async (program: any) => {
    const response = await api.post('/api/programs/downRank', program);
    return response.data;
  }
)
const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.error = null;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(acceptProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptProgram.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(rejectProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectProgram.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(rejectProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        const newStatus = action.payload.data;
        const index = state.items.findIndex(item => item._id === newStatus._id);
        if (index !== -1) {
          state.items[index] = newStatus;
        }
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(pinProgram.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPrograms = action.payload.data; // Assuming the server returns the updated programs
        state.items = state.items.map(item =>
          updatedPrograms.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortPrograms(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(pinProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(unPinProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(unPinProgram.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPrograms = action.payload.data; // Assuming the server returns the updated programs
        state.items = state.items.map(item =>
          updatedPrograms.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortPrograms(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(unPinProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(upRankProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(upRankProgram.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPrograms = action.payload.data; // Assuming the server returns the updated programs
        state.items = state.items.map(item =>
          updatedPrograms.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortPrograms(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(upRankProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(downRankProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(downRankProgram.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPrograms = action.payload.data; // Assuming the server returns the updated programs
        state.items = state.items.map(item =>
          updatedPrograms.find((updated: any) => updated._id === item._id) || item
        );
        state.items = sortPrograms(state.items); // Re-sort the list
        state.error = null;
      })
      .addCase(downRankProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
const sortPrograms = (programs: any[]) => {
  return programs.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return b.isFeatured - a.isFeatured; // Featured programs first
    }
    if (a.isFeatured) {
      return a.featureRank - b.featureRank; // Sort featured programs by featureRank
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort remaining programs by createdAt
  });
};

export default programSlice.reducer;