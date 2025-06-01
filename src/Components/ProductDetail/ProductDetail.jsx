
import React, { useEffect, useState } from 'react';
import style from './Product.module.css';
import Layout from '../../Components/LayOut/Layout';
import ProductCard from '../Product/ProductCard';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { productUrl } from '../../Api/endPoints';
import axios from 'axios';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
      });
  }, [productId]);

  return (
    <Layout>
      {loading ? <Loader /> : <ProductCard product={product}  flex = {true} renderDesc ={true} renderAdd ={true}/>}
     
    </Layout>
  );
}
export default ProductDetail;
