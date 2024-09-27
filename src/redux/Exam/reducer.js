import {ADD_EXAM, REMOVE_EXAM, MARK_COMPLETED, MARK_INCOMPLETED, FILTER_EXAMS, MARK_ALL_COMPLETED, UPDATE_SEARCH_TERM } from "./actionTypes"

const initialState = {
    exams: [],
    filter: "ALL",
    searchItem: ""
}
const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXAM:
            return {
                exams: [...state.exams, action.payload],
                filter: state.filter,
                searchItem: state.searchItem
            }
        case REMOVE_EXAM:
            return {
                ...state,
                exams: state.exams.filter(exam => exam.id !== action.payload.id)
            };
        case MARK_COMPLETED:
            return {
                exams: state.exams.map((exam) =>
                    exam.id === action.payload.id ? { ...exam, completed: true, completeTime: action.payload.completeTime } : exam),
                filter: state.filter,
                searchItem: state.searchItem
            }
        case MARK_INCOMPLETED:
            return {
                exams: state.exams.map((exam) =>
                    exam.id === action.payload.id ? { ...exam, completed: false, completeTime: action.payload.completeTime } : exam),
                filter: state.filter,
                searchItem: state.searchItem
            }
        case FILTER_EXAMS:
            return {
                exams: state.exams,
                filter: action.payload.filter,
                searchItem: state.searchItem
            }
        case UPDATE_SEARCH_TERM:
            return {
                exams: state.exams,
                filter: state.filter,
                searchItem: action.payload.searchItem
            }
        case MARK_ALL_COMPLETED:
            return {
                ...state,
                exams: state.exams.map(exam => ({
                    ...exam,
                    completed: true
                }))
            };
        default:
            return state;
    }
}

export default examReducer;