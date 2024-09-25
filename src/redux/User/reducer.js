import { ADD_USER, REMOVE_USER, UPDATE_SEARCH_USERS } from "./actionTypes"

const initialState = {
    users: [],
    filter: "ALL",
    searchItem: ""
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
                filter: state.filter,
                searchItem: state.searchItem
            }
        case REMOVE_USER:
            return { 
                ...state, 
                users: state.users.filter(user => user.id !== action.payload.id)
            };
        case FILTER_USERS:
            return {
                users: state.users,
                filter: action.payload.filter,
                searchItem: state.searchItem
            };
        case UPDATE_SEARCH_USERS:
            return {
                users: state.users,
                filter: state.filter,
                searchItem: action.payload.searchItem
            }
        default:
            return state;
    }
}

export default userReducer;