
import { Type } from "./action";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(item => item.id === action.item.id);

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

      const updatedBasket = state.basket.map(item =>
        item.id === action.item.id
          ? { ...item, amount: item.amount + 1 }
          : item
      );

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.DECREMENT_ITEM: {
      const updatedBasket = state.basket
        .map(item =>
          item.id === action.id
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter(item => item.amount > 0);

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.UPDATE_BASKET:
      return {
        ...state,
        basket: action.payload,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};



// import { Type } from './action';

// export const initialState = {
//   basket: [],
//   user: null,
// };

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET: {
//       const existingItem = state.basket.find(item => item.id === action.item.id);

//       if (!existingItem) {
//         return {
//           ...state,
//           basket: [...state.basket, { ...action.item, amount: 1 }],
//         };
//       }

//       const updatedBasket = state.basket.map(item =>
//         item.id === action.item.id
//           ? { ...item, amount: item.amount + 1 }
//           : item
//       );

//       return {
//         ...state,
//         basket: updatedBasket,
//       };
//     }

//     case Type.DECREMENT_ITEM: {
//       const updatedBasket = state.basket
//         .map(item =>
//           item.id === action.id
//             ? { ...item, amount: item.amount - 1 }
//             : item
//         )
//         .filter(item => item.amount > 0);

//       return {
//         ...state,
//         basket: updatedBasket,
//       };
//     }

//     case Type.EMPTY_BASKET:
//       return {
//         ...state,
//         basket: [],
//       };

//     case Type.SET_USER:
//       return {
//         ...state,
//         user: action.user,
//       };

//     default:
//       return state;
//   }
// };

