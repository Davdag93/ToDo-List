import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const url = process.env.REACT_APP_URL_API
export interface Todo {
    _id: string,
    id_user: number,
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

export const getAllTodos = createAsyncThunk("todos/fetchTodos", (id_user:number) => {
    return axios.get(url + 'api/todos/'+id_user)
    .then((response) => {
        if(response.status !== 200) throw Error(response.statusText)
        return response.data 
    }).catch((error) => {throw Error(error.message)})
})

export const deleteTodo = createAsyncThunk("todos/removeTodo", (id: string) => {
    return axios.delete(url + 'api/todo/delete/'+ id)
    .then((response) => {
        if(response.status !== 200) throw Error(response.statusText)
        return id
    }).catch((error) => {throw Error(error.message)})
})

export const completeTodo = createAsyncThunk("todos/completeTodo", async (todo: Todo) => {
  const completed = todo.completed === 'completed' ? '' : 'completed';
  
  try {
    const response = await axios.patch(url + 'api/todo/modifica/' + todo._id, { completed });
    if (response.status !== 200) throw Error(response.statusText);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error('Errore:', error);
    throw Error(error.message);
  }
});


export const addTodo = createAsyncThunk("todos/addTodo", (obj: Todo) => {
    return axios.post(url + 'api/todo', obj).then(response => {
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
                    state.todolist =  action.payload 
                  })
                  .addCase(deleteTodo.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(deleteTodo.fulfilled, (state, action) => {
                    state.todolist = state.todolist.filter(todo => todo._id !== action.payload)
                  })
                  .addCase(completeTodo.rejected, (state, action) => {
                    state.error = action.error.message
                  })
                  .addCase(completeTodo.fulfilled, (state, action) => {
                    const index = state.todolist.findIndex(todo => todo._id === action.payload.id)
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
    
)

export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
export const selectTodolist = (state: RootState) => state.todos.todolist;

const { reducer } = todos_slice;
export default reducer