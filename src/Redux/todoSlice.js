// import { createSlice } from "@reduxjs/toolkit";

// const loadTodos = () => {
//     try {
//         const todos = localStorage.getItem('todos');
//         return todos ? JSON.parse(todos) : [];
//     } catch (error) {
//         console.error("Error loading todos from localStorage:", error);
//         return [];
//     }
// };

// const initialState = {
//     todos: loadTodos(),
// };

// export const todoSlice = createSlice({
//     name: 'todos',
//     initialState,
//     reducers: {
//         // Add new todo and save to localStorage
//         addtodo: (state, action) => {
//             state.todos.push(action.payload);
//             localStorage.setItem('todos', JSON.stringify(state.todos));
//         },
//         // Delete todo and update localStorage
//         deletetodo: (state, action) => {
//             state.todos = state.todos.filter(item => item.id !== action.payload);
//             localStorage.setItem('todos', JSON.stringify(state.todos)); // Update localStorage
//         },
//         // Edit todo and update localStorage
//         edittodo: (state, action) => {
//             const todoIndex = state.todos.findIndex(item => item.id === action.payload.id);
//             if (todoIndex !== -1) {
//                 // state.todos[todoIndex] = action.payload;
//                 state.todos[todoIndex] = { ...state.todos[todoIndex], ...action.payload };
//                 localStorage.setItem('todos', JSON.stringify(state.todos)); // Update localStorage
//             }
//         },
//         initializeTodos: (state) => {
//             state.todos = loadTodos();
//         }
//     },
// });

// export const { addtodo, edittodo, deletetodo,initializeTodos } = todoSlice.actions;
// export default todoSlice.reducer;


// O L D - C O D E //
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Todostorage: [],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addtodo: (state, action) => {
            
            state.Todostorage.push(action.payload);
        },
        // show list
        listtodo: (state, action) => {
            state.Todostorage = action.payload;
        },
        // delete list
        deletetodo: (state, action) => {
            state.Todostorage = state.Todostorage.filter(items => items.id !== action.payload)
        },
        // update list
        updatetodo: (state, action) => {
            const todoindex = state.Todostorage.findIndex(items => items.id === action.payload.id);
            if (todoindex !== -1) {
                state.Todostorage[todoindex] = action.payload;
            }
        }

    },

})
export const { addtodo, listtodo, updatetodo, deletetodo } = todoSlice.actions;
export default todoSlice.reducer;