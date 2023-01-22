import { IProductState, ProductAction, ProductActionTypes } from "./types";

const initState : IProductState ={
    list: [
        // {
        //     id: 2,
        //     detail: "Для козака",
        //     name: "Смитана"
        // }
    ],
    count_page: 0,
    current_page: 0,
    total: 0
}
//заміна та доповнення інформації
export const productReducer = (state=initState, action: ProductAction) : IProductState => {
    switch(action.type){
        case ProductActionTypes.GET_PRODUCTS:{
            return{
                ...state,
                ...action.payload
            }
        }
    }
    return state;
};

