import { getBook } from "../actions"

const thunkApi = async(dispatch)=>{

    const response = await fetch(`http://localhost:5000/books`)
    const data = await response.json()
    // console.log(data);
    dispatch(getBook(data))

}

export default thunkApi;
