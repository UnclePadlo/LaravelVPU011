//Експорт интерфейсу
export interface IProductItem{
    id: number,
    name: string,
    detail: string
}

//Експорт интерфейсу
export interface IProductResponse{
    data: Array<IProductItem>,
    current_page: number,
    total: number,
    last_page: number
}

export interface ISearchProduct {
    name?: string,
    page?: number|string|null;
}

//Експорт интерфейсу
export interface IProductState {
    list: Array<IProductItem>,
    current_page: number,
    total: number,
    count_page: number
}

//Експорт интерфейсу
export interface IProductSearch{
    name?: string,
    page?: number|string|null;
}

//Експорт енам
export enum ProductActionTypes {
    GET_PRODUCTS = "GET_PRODUCTS_ACTION"
}

//Експорт интерфейсу
export interface GetProductAction {
    type: ProductActionTypes.GET_PRODUCTS,
    payload: IProductState
}

export interface IAddProduct{
    name?: string,
    detail?: string;
}

export type ProductAction =  | GetProductAction