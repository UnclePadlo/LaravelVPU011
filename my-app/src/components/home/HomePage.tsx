import classNames from "classnames";
import { useFormik } from "formik";
import qs from "qs";
import { ISearchProduct } from "./types";
import { useActions } from "../../hooks/useActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import http from "../../http_common";
import { GetProductAction, IProductItem, IProductResponse, IProductSearch, IProductState, ProductActionTypes } from "./types";

const HomePage = () => {
  const {list, total, count_page, current_page} = useSelector((store: any)=> store.product as IProductState);
  //const [list, setList] = useState<Array<IProductItem>>([]);
 

  
  //Получення функції
  const dispatch = useDispatch();
  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<ISearchProduct>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
  });

  function filterNonNull(obj: ISearchProduct) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  //хук, который можно использовать для замены некоторых методов жизненного цикла классового компонента
  useEffect(() => {
    
    http.get<IProductResponse>("/api/products?page="+search.page).then((resp)=>{
      const action : GetProductAction = {
        type: ProductActionTypes.GET_PRODUCTS,
        payload: {

          list: resp.data.data,
          count_page: resp.data.last_page,
          current_page: resp.data.current_page,
          total: resp.data.total
        }
      }
      dispatch(action);
    })
  }, [searchParams]);


  //Кнопка сторінок продуктів
  const buttons:  Array<number> = [];
  for(let i =1; i<=count_page; i++){
    buttons.push(i);
  }
  const pagination = buttons.map(page => {
    return (
      <li key={page} className="page-item">
        <Link 
        to={"?page="+page} 
        className={classNames("page-link", {active: page==current_page})}
        onClick={()=>{setSearch({...search, page})}}
        >
          {page}
          </Link>
      </li>
    )
  });

  const deleteProduct = (id: number) =>{

    http.delete("/api/products" + id).then( resp =>{
      http.get<IProductResponse>("/api/products?page="+search.page).then((resp)=>{
        const action : GetProductAction = {
          type: ProductActionTypes.GET_PRODUCTS,
          payload: {
            list: resp.data.data,
            
            count_page: resp.data.last_page,
            current_page: resp.data.current_page,
            total: resp.data.total
          }
        }
        dispatch(action);
      })
      console.log(resp);
    });
  }

//використання функції до кожного елементу списка
  const data_content = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <button onClick={()=>deleteProduct(product.id)}>delete</button>
    </tr>
  ));

    const handleClickPaginate = (page: number) => {
    setSearch({ ...search, page: page });
    setSearchParams(qs.stringify(filterNonNull({ ...search, page: page })));
  }

  const onSubmit = (values: ISearchProduct) => {
    setSearchParams(qs.stringify(filterNonNull(values)));
    setSearch(values);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit,
  });
  return (
    <>
      <h1>Головна сторінка</h1>
      <div className="table-responsive">
        <form
          className=" w-100 mt-3 d-flex flex-wrap border border-secondary rounded-3 position-relative"
          onSubmit={formik.handleSubmit}
          >

          <div className="mb-3 p-3 w-25">
            <label htmlFor="name" className="form-label">Назва</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по імені"
              />
          </div>

          <button type="submit" className="btn mb-3 btn-secondary">
            <span>
              <i className="fa fa-search"></i>
            </span>
            <span>Пошук</span>
          </button>
        </form>
        

        <h4>Всього записів: {total}</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>{data_content}</tbody>
        </table>
        <nav>
          <ul className="pagination">
            {pagination}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HomePage;
