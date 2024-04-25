import {
  // FEATURES,
  GET_BOOKS,
  CREATE,
  DELETE,
  // GETUPDATEID,
  UPDATE_INFO,
} from "./actionsType";

export const getBook = (data) => {
  return {
    type: GET_BOOKS,
    payload: data,
  };
};

// export const featured = (status) => {
//   return {
//     type: FEATURES,
//     payload: status,
//   };
// };

export const createBooks = (data) => {
  return {
    type: CREATE,
    payload: data,
  };
};

// export const getUpdateId = (data) => {
 
//   return {
//     type: GETUPDATEID,
//     payload: data,
//   };
// };

export const updateinfo = (id, data) => {
//   console.log(id, data,'actions');
  return {
    type: UPDATE_INFO,
    payload: {
      id,
      data,
    },
  };
};

export const remove = (id) => {
  return {
    type: DELETE,
    payload: id,
  };
};
