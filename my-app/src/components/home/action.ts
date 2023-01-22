import { Dispatch } from "react";
import http from "../../http_common";
import { IProductResponse, ISearchProduct, ProductAction, ProductActionTypes } from "./types";

export const GetProductList = (search: ISearchProduct) => async(dispatch: Dispatch<ProductAction>) => {
    try{
        const response = await http.get<IProductResponse>('/api/products', {
            params: search
        });
        const {data} = response;
        console.log("data", data);
        dispatch({
            type: ProductActionTypes.GET_PRODUCTS,
            payload: {
                list: [...data.data],
                count_page: data.last_page,
                total: data.total,
                current_page: data.current_page,
                
            }
        });
    }
    catch(err: any) {
        return Promise.reject();
    }
}