import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Product() {
    const myInputRef0 = React.createRef();
    const myInputRef1 = React.createRef();
    const myInputRef2 = React.createRef();
    const myInputRef3 = React.createRef();
    const myInputRef4 = React.createRef();
    const myInputRef5 = React.createRef();
    const myInputRef6 = React.createRef();
    const [product, setProduct] = useState([]);
    const [message,setMessage] = useState('');
    useEffect(() => {
        console.log("request to api");
        axios.get("http://127.0.0.1:5000/products")
            .then(response => setProduct(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [product]);

    const onDeleteProducts = (id) => {
        console.log("DELETE " + id);
        axios.delete(`http://127.0.0.1:5000/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while deleting the product.');
            });        
    };
    
    const onOkClick = (id) => {
        console.log("UPDATE " + id);
        const data = {
            name: myInputRef4.current.value,
            price: myInputRef5.current.value,
            img: myInputRef6.current.value
        };
        axios.put(`http://127.0.0.1:5000/products/${id}`, data)
            .then((response) => {
                setProduct(response.data)
                setMessage('Update Successfuly!')
            })
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while updating the product.');
            });
    };
    
    const onAddProduct = () => {
        const data = {
            _id:myInputRef0.current.value,
            name: myInputRef1.current.value,
            price: myInputRef2.current.value,
            img: myInputRef3.current.value
        };
        axios.post("http://127.0.0.1:5000/products", data)
            .then((response) => {
                setProduct(response.data)
                setMessage(' ')
            })
            .catch(error => {
                console.error('Error', error);
                setMessage(error.response.data.message || 'An error occurred while adding the product.');
            });
    };

    if (!product) return null;

    let productList;
    if (Array.isArray(product)) {
        productList = product.map(p => (
            <div style={{display : 'flex' ,alignItems : 'center'  ,justifyContent : 'center'}}>
                <li key={p._id}>
                    ID :{p._id}
                    <span> {p.name}</span>
                    <img src={p.image}/> 
                    {p.price}
                    <button onClick={() => onDeleteProducts(p._id)} style={{backgroundColor : '#007bff'}}>Delete</button>
                    <button onClick={() => onOkClick(p._id)} style={{ backgroundColor: '#007bff'}}>ok</button>
                </li>
            </div>
        ));
    } else {
        productList = []; 
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'lightgrey' }}>
            <div style={{ width: '80%', maxWidth: '600px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                <h1 style={{ textAlign: 'center', marginTop: '30px', color: '#333', fontSize: '24px' }}>Product List</h1>
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                    {productList}
                </ul>
            </div>
    
            <div style={{ width: '80%', maxWidth: '600px', marginTop: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <h1 style={{ textAlign: 'center', marginTop: '30px', color: '#333', fontSize: '24px' }}>Add Products</h1>
                <div>{message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>{message}</p>}</div>
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>ID:</label>
                <input type="number" name="product_id" ref={myInputRef0} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>Product Name:</label>
                <input type="text" name="product_name" ref={myInputRef1} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>Price:</label>
                <input type="text" name="product_price" ref={myInputRef2} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>Image URL:</label>
                <input type="text" name="product_img" ref={myInputRef3} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <button onClick={onAddProduct} style={{ width: '100%', padding: '12px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Add Product</button>
            </div>
        </div>
    );
    
    
    
    
}