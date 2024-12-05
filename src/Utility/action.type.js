// It's generally a good practice to avoid multiple dots in file names unless they have a specific purpose (like versioning). 

export const Type = {
  ADD_TO_BASKET: "ADD_TO_BASKET",
  REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
  SET_USER: "SET_USER",
  // EMPTY_BASKET: "EMPTY_BASKET",
};

// to represent a key-value pair with the same name, you can use the name only once and separate it with a comma. For instance :
/* 
export const Type = {
  ADD_TO_BASKET, REMOVE_FROM_BASKET
}; 
This is equivalent to : 
export const Type = {
  ADD_TO_BASKET:' ADD_TO_BASKET', REMOVE_FROM_BASKET:'REMOVE_FROM_BASKET'
}; */

/*
defining a set of constants used as action types in a state management system, typically within a Redux setup or a context with useReducer in React. These constants help in managing different actions that can be dispatched to modify the state.

Exporting an Object:export const Type: This line exports the Type object, making it available for import in other parts of the application.

Action Types:
1. ADD_TO_BASKET: "ADD_TO_BASKET" - This action type could be used to add an item to a shopping basket or cart.
2. REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET" - This action type could be used to remove an item from the basket or cart.
3. SET_USER: "SET_USER" - This action type could be used to set or update the user information in the state.
4. EMPTY_BASKET: "EMPTY_BASKET" - This action type could be used to empty the basket or cart completely. 

Purpose:
1. Consistency and Avoiding Typos:Using constants for action types ensures consistency across the application and helps prevent typos that can occur when typing action type strings directly in multiple places.

2. Easier Maintenance:Centralizing action type definitions in one file makes it easier to manage and update action types. If you need to change an action type, you only do it in one place.*/