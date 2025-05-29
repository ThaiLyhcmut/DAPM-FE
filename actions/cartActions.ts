export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (item: {
  _id: string;
  name: string;
  image: string;
  price: string;
  rating: string;
  quantity: number;
}) => {
  return {
    type: ADD_TO_CART,
    payload: item
  };
};
export const removeFromCart = (_id: string) => {
  console.log('removeFromCart action called with _id:', _id);
  return {
    type: REMOVE_FROM_CART,
    payload: { _id }
  };
}
export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
}
export const setNoteFood = (note: string) => {
  return {
    type: 'SET_NOTE_FOOD',
    payload: note
  };
};
export const clearNoteFood = () => {
  return {
    type: 'CLEAR_NOTE_FOOD'
  };
}
export const addFriend = (friend: string) => {
  return {
    type: 'ADD_FRIEND',
    payload: friend
  };
}
export const removeFriend = (friend: string) => {
  return {
    type: 'REMOVE_FRIEND',
    payload: friend
  };
}

export const setTotalPrice = (price: string) => {
  return {
    type: 'SET_TOTAL_PRICE',
    payload: price
  };
};

export const clearAllCart = () => {
  return {
    type: 'CLEAR_ALL_CART'
  };
};