import {ADD_TASK, REMOVE_TASK, MARK_COMPLETED, MARK_INCOMPLETED, FILTER_TASKS, MARK_ALL_COMPLETED, UPDATE_SEARCH_TERM } from "./actionTypes"

const initialState = {
    tasks: [],
    filter: "ALL",
    searchItem: ""
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                tasks: [...state.tasks, action.payload],
                filter: state.filter,
                searchItem: state.searchItem
            }
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };
        case MARK_COMPLETED:
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? { ...task, completed: true, completeTime: action.payload.completeTime } : task),
                filter: state.filter,
                searchItem: state.searchItem
            }
        case MARK_INCOMPLETED:
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? { ...task, completed: false, completeTime: action.payload.completeTime } : task),
                filter: state.filter,
                searchItem: state.searchItem
            }
        case FILTER_TASKS:
            return {
                tasks: state.tasks,
                filter: action.payload.filter,
                searchItem: state.searchItem
            }
        case UPDATE_SEARCH_TERM:
            return {
                tasks: state.tasks,
                filter: state.filter,
                searchItem: action.payload.searchItem
            }
        case MARK_ALL_COMPLETED:
            return {
                ...state,
                tasks: state.tasks.map(task => ({
                    ...task,
                    completed: true
                }))
            };
        default:
            return state;
    }
}

export default taskReducer;