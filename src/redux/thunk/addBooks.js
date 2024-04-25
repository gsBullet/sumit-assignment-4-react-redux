import { createBooks } from "../actions";

const addBooks = (formData) => {
  console.log(formData);
  return async (dispatch) => {
    const name = formData.get('name');
    const author = formData.get('author');
    const price = formData.get('price');
    const featured = formData.get('featured');
    const rating = formData.get('rating');
    const thumbnail = formData.get('thumbnail');

    const requestData = {
      name,
      author,
      price,
      featured: featured? true: false,
      rating,
      thumbnail
    };

    const response = await fetch(`http://localhost:5000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    dispatch(createBooks(data));
  };
};

export default addBooks;


