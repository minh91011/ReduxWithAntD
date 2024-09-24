import {SET_TASK, ADD_TASK, REMOVE_TASK, MARK_COMPLETED, MARK_INCOMPLETED, FILTER_TASKS, MARK_ALL_COMPLETED, UPDATE_SEARCH_TERM } from "./actionTypes"


export const setTask = (task) => ({
    type: SET_TASK,
    payload: task
});
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: {task} 
});
export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: {id}   
});
export const markCompleted = (id) => ({
    type: MARK_COMPLETED,
    payload: {id}
});
export const markInCompleted = (id) => ({
    type: MARK_INCOMPLETED,
    payload: {id}
});
export const filterTasks = (filter) => ({
    type: FILTER_TASKS,
    payload: {filter}
});
export const markAllCompleted = () => ({
    type: MARK_ALL_COMPLETED
});
export const updateSearchTerm = (searchItem) => ({
    type: UPDATE_SEARCH_TERM,
    payload: {searchItem}
});