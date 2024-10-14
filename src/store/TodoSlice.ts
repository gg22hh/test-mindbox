import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodos } from "../types/types";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

type TodosState = {
    todos: Todo[];
    loading: boolean;
};

const jsonLoc =
    localStorage.getItem("todos") &&
    JSON.parse(localStorage.getItem("todos") || "");

const initialState: TodosState = {
    todos: jsonLoc || [],
    loading: false,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch(
        "https://6254687719bc53e2347e0da5.mockapi.io/todosss"
    );
    if (response.ok) {
        const json = await response.json();
        localStorage.setItem("todos", JSON.stringify(json));
        return json;
    } else {
        return new Error("Ошибка при получении todos");
    }
});

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        toggleItem(state, action: PayloadAction<ITodos>) {
            const updatedTodo = {
                ...action.payload,
                completed: !action.payload.completed,
            };
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            state.todos = updatedTodos;
        },
        deleteTodos(state) {
            const sure = window.confirm("Delete tasks ?");
            if (sure) {
                const updatedTodos = [...state.todos].filter(
                    (todo) => todo.completed === false
                );
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                state.todos = updatedTodos;
            }
        },
        addNewTodo(state, action: PayloadAction<string>) {
            const id = Math.random();
            const newTodo = {
                id: id,
                title: action.payload,
                completed: false,
            };
            const updatedTodos = [...state.todos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            state.todos = updatedTodos;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.loading = false;
        });
    },
});

export const { toggleItem, deleteTodos, addNewTodo } = todoSlice.actions;

export default todoSlice.reducer;
