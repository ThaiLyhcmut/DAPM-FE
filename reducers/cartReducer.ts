

interface CartState {
  items: {
    _id: string;
    name: string,
    image: string;
    price: string;
    rating: number;
    quantity: number;
  }[],
  friendsList: string[],
  notefood: string,
  totalPrice?: string
};

const initialState: CartState = {
  items: [],
  friendsList: [],
  notefood: "",
  totalPrice: ""
};

export default function cartReducer(state = initialState, action: any): CartState {
  console.log('cartReducer action:', action.payload);
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems, totalPrice: action.payload.price || "" };
      } else {
        return { ...state, items: [...state.items, action.payload], totalPrice: action.payload.price || "" };
      }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item._id !== action.payload._id), totalPrice: action.payload.price || "" };
    case 'CLEAR_CART':
      return { ...state, items: [], totalPrice: "" };
    case 'ADD_FRIEND':
      if (!state.friendsList.includes(action.payload)) {
        return { ...state, friendsList: [...state.friendsList, action.payload] };
      }
    case 'REMOVE_FRIEND':
      return { ...state, friendsList: state.friendsList.filter(friend => friend !== action.payload) };
    case 'SET_NOTE_FOOD':
      return { ...state, notefood: action.payload };
    case 'CLEAR_NOTE_FOOD':
      return { ...state, notefood: "" };
    case 'SET_TOTAL_PRICE':
      return { ...state, totalPrice: action.payload };
    case 'CLEAR_ALL_CART': 
      return { ...initialState }; // Reset to initial state
    default:
      return state;
  }
}