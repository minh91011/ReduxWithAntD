import {ADD_EXAM, REMOVE_EXAM, MARK_COMPLETED, MARK_INCOMPLETED, FILTER_EXAMS, MARK_ALL_COMPLETED, UPDATE_SEARCH_TERM } from "./actionTypes"

export const addExam = (exam) => ({
    type: ADD_EXAM,
    payload: {exam} 
});
export const removeExam = (id) => ({
    type: REMOVE_EXAM,
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
export const filterExams = (filter) => ({
    type: FILTER_EXAMS,
    payload: {filter}
});
export const markAllCompleted = () => ({
    type: MARK_ALL_COMPLETED
});
export const updateSearchTerm = (searchItem) => ({
    type: UPDATE_SEARCH_TERM,
    payload: {searchItem}
});