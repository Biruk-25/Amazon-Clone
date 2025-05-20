import { Type } from './action';

export const initialState = {
    basket: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Type.ADD_TO_BASKET: {
            const existingItem = state.basket.find(item => item.id === action.item.id);

            if (!existingItem) {
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                const updatedBasket = state.basket.map(item =>
                    item.id === action.item.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );

                return {
                    ...state,
                    basket: updatedBasket
                };
            }
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
                basket: updatedBasket
            };
        }

        default:
            return state;
    }
};




// import { Type } from './action';

// export const initialState = {
//     basket: []
// };

// export const reducer = (state, action) => {
//     switch (action.type) {
//         case Type.ADD_TO_BASKET: {
//             const existingItem = state.basket.find(item => item.id === action.item.id);

//             if (!existingItem) {
//                 return {
//                     ...state,
//                     basket: [...state.basket, { ...action.item, amount: 1 }]
//                 };
//             } else {
//                 const updatedBasket = state.basket.map(item =>
//                     item.id === action.item.id
//                         ? { ...item, amount: item.amount + 1 }
//                         : item
//                 );

//                 return {
//                     ...state,
//                     basket: updatedBasket
//                 };
//             }
//         }

//         case Type.DECREMENT_ITEM: {
//             const updatedBasket = state.basket
//                 .map(item =>
//                     item.id === action.id
//                         ? { ...item, amount: item.amount - 1 }
//                         : item
//                 )
//                 .filter(item => item.amount > 0); // Remove item if amount goes to 0

//             return {
//                 ...state,
//                 basket: updatedBasket
//             };
//         }

//         default:
//             return state;
//     }
// };








// // import { Type } from './action';

// // export const initialState = {
// //     basket: []
// // };

// // export const reducer = (state, action) => {
// //     switch (action.type) {
// //         case Type.ADD_TO_BASKET: {
// //             const existingItem = state.basket.find(item => item.id === action.item.id);

// //             if (!existingItem) {
// //                 return {
// //                     ...state,
// //                     basket: [...state.basket, { ...action.item, amount: 1 }]
// //                 };
// //             } else {
// //                 const updatedBasket = state.basket.map(item =>
// //                item.id === action.item.id
// //                         ? { ...item, amount: item.amount + 1 }
// //                         : item
// //                 );

// //                 return {
// //                     ...state,
// //                     basket: updatedBasket
// //                 };
// //             }
// //         }

// //         default:
// //             return state;
// //     }
// // };



// // // import { Type } from './action';

// // // export const initialState = {
// // //     basket: []
// // // };

// // // export const reducer = (state, action) => {
// // //     switch (action.type) {
// // //         case Type.ADD_TO_BASKET: {
// // //             const existingItem = state.basket.find(item => item.id === action.item.id);

// // //             if (!existingItem) {
// // //                 return {
// // //                     ...state,
// // //                     basket: [...state.basket, { ...action.item, amount: 1 }]
// // //                 };
// // //             } else {
// // //                 const updatedBasket = state.basket.map(item =>
// // //                     item.id === action.item.id
// // //                         ? { ...item, amount: item.amount + 1 }
// // //                         : item
// // //                 );

// // //                 return {
// // //                     ...state,
// // //                     basket: updatedBasket
// // //                 };
// // //             }
// // //         }

// // //         default:
// // //             return state;
// // //     }
// // // };



// // // import {Type} from './action'



// // // export const initialState = {
// // //     basket:[]
// // // }
// // // export const reducer =(state,action) => {
// // //     switch(action.type) {
// // //         case Type.ADD_TO_BASKET:
// // //             const existingItem =state.basket.find((item)=> item.id === action.item.id)
// // //             if (!existingItem){
// // //                 return {
// // //                 ...state,
// // //                 basket: [...state.basket, {...action.item, amount:1}]
// // //             }
// // //             }else{
// // //                 const updateBasket = state.basket.map((item)=> {
// // //                  return   item.id ===action.id? {...item, amount:item.amount + 1} : item
// // //                 })
// // //                 return {
// // //                     ...state, basket :updateBasket
// // //                 }
// // //             }
            
// // //             default:
// // //                 return state;
// // //     }
// // // }