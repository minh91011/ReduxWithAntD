import { ADD_USER, REMOVE_USER, FILTER_USERS, UPDATE_SEARCH_TERM } from "./actionTypes"


export const addUser = (user) => ({
    type: ADD_USER,
    payload: {user}
});
export const removeUser = (id) => ({
    type: REMOVE_USER,
    payload: {id}   
});
export const filterUsers = (filter) => ({
    type: FILTER_USERS,
    payload: {filter}
});
export const updateSearchTerm = (searchItem) => ({
    type: UPDATE_SEARCH_TERM,
    payload: {searchItem}
});