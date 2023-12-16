// En tu archivo HomeScreen.jsx en React

import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/message.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const FilterScreen = () => {
  const [inputBudget, setInputBudget] = useState('');
  const [queryBudget, setQueryBudget] = useState('');
  const { data: products, isLoading, error } = useGetProductsQuery(queryBudget);

  const handleFilter = () => {
      setQueryBudget(inputBudget); // Actualiza el presupuesto para la consulta
  }

  return (
    <>
        <input type="number" value={inputBudget} onChange={(e) => setInputBudget(e.target.value)} />
        <button onClick={handleFilter}>Filtrar</button>

        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>
                {error?.data?.message || error.error}
            </Message>
        ) : (
            <>
                <h1>Filter Events</h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </>
        )}
    </>
)
}

export default FilterScreen;
