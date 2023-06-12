import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false
}

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND}task`)
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue('Error')
    }
  }
)

export const createTask = createAsyncThunk(
  'task/createTask',
  async (description, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND}task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      })
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue('Error')
    }
  }
)

export const removeTask = createAsyncThunk(
  'task/removeTask',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND}task?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await res.text()
      return id
    } catch (error) {
      return rejectWithValue('Error')
    }
  }
)

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_BACKEND}task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          active: true
        })
      })
      await res.json()
      return id
    } catch (error) {
      return rejectWithValue('Error')
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: Math.random() * 100,
        description: action.payload,
        active: false
      }
      state.tasks.push(task)
    },
    removeTaskById: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    checkTaskById: (state, action) => {
      const foundIndex = state.tasks.findIndex((task) => task.id === action.payload)
      const task = state.tasks[foundIndex]
      task.active = true
      state.tasks[foundIndex] = task
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true
      state.tasks = []
      state.isError = false
    })
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.tasks = payload
    })
    builder.addCase(getTasks.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    // create task
    builder.addCase(createTask.pending, (state) => {
      // state.isLoading = true
      // state.tasks = []
      // state.isError = false
    })
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      // state.isLoading = false
      // state.tasks = payload
      state.tasks.push(payload)
    })
    builder.addCase(createTask.rejected, (state) => {
      // state.isLoading = false
      // state.isError = true
    })
    // remove task
    builder.addCase(removeTask.pending, (state) => {
      // state.isLoading = true
      // state.tasks = []
      // state.isError = false
    })
    builder.addCase(removeTask.fulfilled, (state, { payload }) => {
      // state.isLoading = false
      // state.tasks = payload
      state.tasks = state.tasks.filter((task) => task.id !== payload)
    })
    builder.addCase(removeTask.rejected, (state) => {
      // state.isLoading = false
      // state.isError = true
    })
    // update task
    builder.addCase(updateTask.pending, (state) => {
      // state.isLoading = true
      // state.tasks = []
      // state.isError = false
    })
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      // state.isLoading = false
      // state.tasks = payload
      const foundIndex = state.tasks.findIndex((task) => task.id === payload)
      const task = state.tasks[foundIndex]
      task.active = true
      state.tasks[foundIndex] = task
    })
    builder.addCase(updateTask.rejected, (state) => {
      // state.isLoading = false
      // state.isError = true
    })
  }
})

export const { addTask, removeTaskById, checkTaskById } = taskSlice.actions
export default taskSlice.reducer
