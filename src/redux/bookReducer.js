import {
  CREATE,
  DELETE,
  // FEATURES,
  GET_BOOKS,
  UPDATE_INFO,
  // GETUPDATEID,
} from "./actionsType";

//  state initialize
const initialState = {
  books: [],
};

// create books id from state
const createBookId = (data) => {
  const id = data.reduce((id, d) => Math.max(d.id, id), -1);
  return id + 1;
};

// reducer

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case CREATE:
      return {
        ...state,
        books: [
          ...state.books,
          {
            id: createBookId(state.books),
            name: action.payload.name,
            author: action.payload.author,
            thumbnail: action.payload.thumbnail,
            price: action.payload.price,
            rating: action.payload.rating,
            featured: action.payload.featured,
          },
        ],
      };

    case DELETE:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    // case FEATURES:
    //   return state.map((books) => {
    //     if (books.id === action.payload) {
    //       return {
    //         ...books,
    //         featured: !books.featured,
    //       };
    //     } else {
    //       return books;
    //     }
    //   });
    // case GETUPDATEID:
    //   return {
    //     ...state,
    //     books: action.payload,
    //   };
    case UPDATE_INFO:
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id === action.payload.id) {
            return {
              ...book,
              name: action.payload.data.name,
              author: action.payload.data.author,
              thumbnail: action.payload.data.thumbnail,
              price: action.payload.data.price,
              rating: action.payload.data.rating,
              featured: action.payload.data.featured,
            };
          } else {
            return book;
          }
        }),
      };

    default:
      return state;
  }
};

export default bookReducer;
