import { useFormik } from "formik";
import { useState } from "react";
import http from "../../../http_common";
import { IAddProduct } from "../../home/types";

const AddPage =() =>{

    const [add, addProduct] = useState<IAddProduct>({
        name: "",
        detail: "",
    });
    const onSubmit = (values: IAddProduct) =>{
        http.post("/api/products", values).then(resp =>{
            console.log(resp);
        })
    };

    const formik = useFormik({
        initialValues: add,
        onSubmit,
    });

    return (
        <>
        <h1>Додати товар</h1>
        <form onSubmit={formik.handleSubmit}>

        <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Назва</span>
                </div>
                <input className="form-control" aria-label="With textarea"/>
            </div>
            
            <br></br>
            
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Деталі</span>
                </div>
                <input className="form-control" aria-label="With textarea"/>
            </div>

            <br></br>
            
            <button type="button" className="btn btn-success">Додати</button>

        </form>
        </>
    );
};

export default AddPage;