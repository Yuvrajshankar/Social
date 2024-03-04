import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
export const initialState = {
    user: null,
    posts: [],
};

// Create a context for authentication
export const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to provide authentication state
export const AuthProvider = ({ reducer, initialState, children }) => (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AuthContext.Provider>
);


// Reducer
export const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user,
            };
        case "SET_LOGOUT":
            return {
                ...state,
                user: null,
                posts: [],
            };
        case "SET_FRIENDS":
            return {
                ...state,
                user: state.user
                    ? { ...state.user, friends: action.payload.friends }
                    : state.user,
            };
        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload.posts,
            };
        case "SET_POST":
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload.post._id ? action.payload.post : post
                ),
            };
        default:
            return state;
    }
};