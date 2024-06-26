import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import thunkApi from "./redux/thunk/thunkApi";
import addBooks from "./redux/thunk/addBooks";
import deleteBook from "./redux/thunk/remove";
import updateInfo from "./redux/thunk/updateInfo";
import { featured } from "./redux/featured/action";

function App() {
  const dispatch = useDispatch();
  const filterFeature = useSelector((state) => state.featured.status);
  const booksData = useSelector((state) => state.bookStore.books);
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState(null);

  // console.log(booksData);

  // useEffect(() => {
  //   dispatch(getUpdateInfo);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(thunkApi);
  }, [dispatch]);

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(addBooks(formData));
    e.target.reset();
    window.location.reload();
  };
  const updateDataHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(updateInfo(data.id, formData));

    // Manually clear form fields
    e.target.reset();
    window.location.reload();
    // const form = e.target;
    // const inputs = form.querySelectorAll('input');
    // inputs.forEach(input => {
    //     input.value = '';
    // });
  };
  const updateHandler = (data) => {
    setData(data);
  };

  const featuredHandler = (status) => {
    dispatch(featured(status));
  };

  const deleteHandler = (id) => {
    dispatch(deleteBook(id));
  };
  const filterByFeatures = (booksData) => {
    switch (filterFeature) {
      // case "All":
      //   return booksData;
      case "Featured":
        return booksData.featured;

      default:
        return true;
    }
  };

  const filterByName = (booksData) => {
    if (searchItem) {
      return booksData.name.toLowerCase().includes(searchItem.toLowerCase());
    } else {
      return booksData;
    }
  };

  return (
    <>
      <nav className="py-4 2xl:px-6">
        <div className="container flex items-center justify-between">
          <img
            src="./images/logo.svg"
            width="150px"
            className="object-contain"
            alt="logo"
          />

          <ul className="hidden md:flex items-center space-x-6">
            <li className="font-semibold cursor-pointer">Book Store</li>
            <li className="cursor-pointer">Wishlist</li>
            <li className="cursor-pointer">My Collection</li>
          </ul>

          <form className="flex items-center">
            <div className="group relative rounded-md bg-white">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Filter books..."
                className="search"
                id="lws-searchBook"
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
          </form>
        </div>
      </nav>

      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <div className="flex items-center justify-between mb-12">
              <h4 className="mt-2 text-xl font-bold">Book List</h4>

              <div className="flex items-center space-x-4">
                <button
                  className="filter-btn active-filter"
                  id="lws-filterAll"
                  defaultChecked
                  onClick={() => featuredHandler("All")}
                >
                  All
                </button>
                <button
                  className="filter-btn"
                  id="lws-filterFeatured"
                  onClick={() => featuredHandler("Featured")}
                >
                  Featured
                </button>
              </div>
            </div>
            <div className="lws-bookContainer">
              {/* <!-- Card 1 --> */}

              {booksData
                .filter(filterByFeatures)
                .filter(filterByName)
                .map((books, index) => (
                  <div key={index}>
                    <div className="book-card">
                      <img
                        className="h-[240px] w-[170px] object-cover lws-bookThumbnail"
                        src={books?.thumbnail}
                        alt="book"
                      />
                      <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
                        <div className="flex items-center justify-between">
                          {books?.featured ? (
                            <span className="badge-success lws-Badge">
                              featured
                            </span>
                          ) : (
                            <span className="badge-danger lws-Badge"></span>
                          )}
                          <div className="text-gray-500 space-x-2">
                            <button
                              className="lws-edit"
                              onClick={() => updateHandler(books)}
                            >
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                            <button
                              className="lws-delete"
                              onClick={() => deleteHandler(books.id)}
                            >
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 mt-4 h-full">
                          <h4 className="lws-bookName">{books?.name}</h4>
                          <p className="lws-author">{books?.author}</p>
                          <div className="lws-stars">
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="lws-star"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="lws-star"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="lws-star"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="lws-price">{books?.price}</p>
                          <p className="lws-price">{books?.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            {data ? (
              <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
                <h4 className="mb-8 text-xl font-bold text-center">
                  Update New Book
                </h4>
                <form className="book-form" onSubmit={updateDataHandler}>
                  <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookname"
                      name="name"
                      defaultValue={data?.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category">Author</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookauthor"
                      name="author"
                      defaultValue={data?.author}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image">Image Url</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookthumbnail"
                      name="thumbnail"
                      defaultValue={data?.thumbnail}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 pb-4">
                    <div className="space-y-2">
                      <label htmlFor="price">Price</label>
                      <input
                        required
                        className="text-input"
                        type="number"
                        id="input-Bookprice"
                        name="price"
                        defaultValue={data?.price}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quantity">Rating</label>
                      <input
                        required
                        className="text-input"
                        type="number"
                        id="input-Bookrating"
                        name="rating"
                        min="1"
                        max="5"
                        defaultValue={data?.rating}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="input-Bookfeatured"
                      type="checkbox"
                      name="featured"
                      className="w-4 h-4"
                      checked={data.featured}
                    />
                    <label htmlFor="featured" className="ml-2 text-sm">
                      {" "}
                      This is a featured book{" "}
                    </label>
                  </div>

                  <button type="submit" className="submit" id="submit">
                    Update Book
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
                <h4 className="mb-8 text-xl font-bold text-center">
                  Add New Book
                </h4>
                <form
                  method="POST"
                  className="book-form"
                  onSubmit={formHandler}
                >
                  <div className="space-y-2">
                    <label htmlFor="name">Book Name</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookname"
                      name="name"
                      // value={'sss'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category">Author</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookauthor"
                      name="author"
                      // value={'mmm'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image">Image Url</label>
                    <input
                      required
                      className="text-input"
                      type="text"
                      id="input-Bookthumbnail"
                      name="thumbnail"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 pb-4">
                    <div className="space-y-2">
                      <label htmlFor="price">Price</label>
                      <input
                        required
                        className="text-input"
                        type="number"
                        id="input-Bookprice"
                        name="price"
                        // value={1000}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quantity">Rating</label>
                      <input
                        required
                        className="text-input"
                        type="number"
                        id="input-Bookrating"
                        name="rating"
                        min="1"
                        max="5"
                        // value={1}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="input-Bookfeatured"
                      type="checkbox"
                      name="featured"
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm">
                      {" "}
                      This is a featured book{" "}
                    </label>
                  </div>

                  <button type="submit" className="submit" id="submit">
                    Add Book
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
