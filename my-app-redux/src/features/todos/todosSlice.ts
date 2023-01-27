import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface Todo {
    id?: number,
    txt: string,
    completed: string,
    data: string,
}

interface TodosState {
    loading: boolean,
    error: string | undefined,
    todolist: Todo[]
}

const initialState: TodosState = {
    loading: false,
    error: undefined,
    todolist: []
}

export const getAllTodos = createAsyncThunk("todos/fetchTodos", () => {
    return axios.get(process.env.REACT_APP_URL_API + 'todos').then((response) => {
        if(response.status !== 200) throw Error(response.statusText)
        return response.data as Todo[]
    }).catch((error) => {throw Error(error.message)})
})

export const deleteTodo = createAsyncThunk("todos/removeTodo", (id: number) => {
    return axios.delete(process.env.REACT_APP_URL_API + 'todos/'+id).then((response) => {
        if(response.status !== 200) throw Error(response.statusText)
        return id
    }).catch((error) => {throw Error(error.message)})
})

export const completeTodo = createAsyncThunk("todos/completeTodo", (obj: Todo) => {
    let todo = Object.assign({}, obj);
    todo.completed = todo.completed === 'completed' ? '' : 'completed';
    return axios.patch(process.env.REACT_APP_URL_API + 'todos/'+todo.id, todo).then((response) => {
        if(response.status !== 200) throw Error(response.statusText)
        console.log(response);
        return response.data
    }).catch((error) => {throw Error(error.message)})
})

export const addTodo = createAsyncThunk("todos/addTodo", (obj: Todo) => {
    return axios.post(process.env.REACT_APP_URL_API + 'todos/', obj).then(response => {
        if(response.status !== 201) throw Error(response.statusText)
        return response.data
    }).catch((error) => {throw Error(error.message)})
})

export const todos_slice = createSlice(
    {
        name: 'todos',
        initialState: initialState,
        reducers: {},
        extraReducers: (builder) => {
                builder
                  .addCase(getAllTodos.pending, (state) => {
                    state.loading = true;
                  })
                  .addCase(getAllTodos.rejected, (state, action) => {
                    state.loading = false; 
                    state.error = action.error.message
                  })
                  .addCase(getAllTodos.fulfilled, (state, action) => {
                    state.loading = false; 
                    state.todolist = action.payload
                  })
                  .addCase(deleteTodo.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(deleteTodo.fulfilled, (state, action) => {
                    state.todolist = state.todolist.filter(todo => todo.id !== action.payload)
                  })
                  .addCase(completeTodo.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(completeTodo.fulfilled, (state, action) => {
                    const index = state.todolist.findIndex(todo => todo.id === action.payload.id)
                    state.todolist[index] = action.payload
                  })
                  .addCase(addTodo.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(addTodo.fulfilled, (state, action) => {
                    state.todolist = [...state.todolist, action.payload]
                  })
              },
        }
        /* 
            JS version
            extraReducers: {
                [getAllTodos.pending]: state => {
                    state.loading = true},
                [getAllTodos.rejected]: (state, action) => {
                    state.loading = false; 
                    state.error = action.error.message},
                [getAllTodos.fulfilled]:(state, action) => {
                    state.loading = false; 
                    state.todolist = action.payload
                },
                [deleteTodo.rejected]: (state, action) => {
                state.error = action.error.message
                },
                [deleteTodo.fulfilled]:(state, action) => {
                    state.todolist = state.todolist.filter(todo => todo.id !== action.payload)
                },
                [completeTodo.rejected]: (state, action) => {
                state.error = action.error.message
                },
                [completeTodo.fulfilled]:(state, action) => {
                    const index = state.todolist.findIndex(todo => todo.id === action.payload.id)
                    state.todolist[index] = action.payload
                },
                [addTodo.rejected]: (state, action) => {
                state.error = action.error.message
                },
                [addTodo.fulfilled]: (state, action) => {
                    state.todolist = [...state.todolist, action.payload]
                },
            } 
        */
    
)

export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
export const selectTodolist = (state: RootState) => state.todos.todolist;

const { reducer } = todos_slice;
export default reducer