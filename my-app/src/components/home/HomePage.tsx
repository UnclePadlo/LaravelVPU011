import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../http_common";
import { GetProductAction, IProductItem, IProductResponse, IProductSearch, IProductState, ProductActionTypes } from "./types";

const HomePage = () => {
  const {list, total, count_page, current_page} = useSelector((store: any)=> store.product as IProductState);
  //const [list, setList] = useState<Array<IProductItem>>([]);
 
  //Получення функції
  const dispatch = useDispatch();

  const [search, setSearch] = useState<IProductSearch>({
    page: 1
  })

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
      // http.get<IProductResponse>("/api/products").then((resp)=>{
      //   //console.log("Response server", resp);
      //   //setList(resp.data.data);
      // });
    })
  }, [search]);
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
    console.log(id);
    
  }
//використання функції до кожного елементу списка
  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <button onClick={()=>deleteProduct(product.id)}>delete</button>
    </tr>
  ));

  return (
    <>
      <h1>Головна сторінка</h1>
      <h4>Усього записів<b>{total}</b></h4>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pagination}
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
