import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const initialState = [];

const init = () => JSON.parse(localStorage.getItem('todos') || []);

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])

    const agregarNewTodo = (newTodo) => {
        // console.log(newTodo);
        const action = {
            type: 'add',
            payload: newTodo
        }

        dispatch(action);
    }

    const deleteTodo = (id) => {

        dispatch({
            type: 'remove',
            payload: id
        })

    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'toggle',
            payload: id
        })
    }

    const countTodos = () => todos.length;

    const countTodosPending = () => todos.filter(todo => !todo.done).length;

    return {
        todos,
        agregarNewTodo,
        deleteTodo,
        handleToggleTodo,
        countTodos,
        countTodosPending
    }
}
