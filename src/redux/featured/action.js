import { FEATURED } from "./actionsType"

export const featured = (status)=>{
    return{
        type:FEATURED,
        payload:status
    }
}