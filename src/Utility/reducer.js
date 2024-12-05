import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
  //   null: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // * check if the item exists
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      //   we use spread operator to keep the initial item in the basket when new items are added
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }
      //   if we have already an item in basket (>=1)
      else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    //  remove from basket case
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      // if index >= 0, there is an item in the basket
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        }
        // if only one item, remove that item using splice
        else {
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    // Handle the action type 'SET_USER'
    case Type.SET_USER:
      return {
        ...state, // Spread the current state to keep existing properties
        user: action.user, // Update the 'user' property in the state with the value from 'action.user'; The value for action.user is typically defined and dispatched within an action creator function
      };

    default:
      return state;
  }
};
