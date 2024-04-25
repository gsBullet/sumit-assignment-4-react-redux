import {  remove } from "../actions";

const deleteBook = (bookId) => {
  
  return async (dispatch) => {
     await fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE"
    });
    // console.log(data);
    dispatch(remove(bookId));
  };
};

export default deleteBook;
