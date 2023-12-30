import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/message.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import { useGetServicesQuery } from '../slices/servicesApiSlice.js';
import { useGetSupplierTypesQuery } from '../slices/supplierTypesApiSlice.js';

const FilterScreen = () => {
  const [inputBudget, setInputBudget] = useState('');
  const [queryBudget, setQueryBudget] = useState('');

  const [selectedService, setSelectedService] = useState('');
  const [selectedSupplierType, setSelectedSupplierType] = useState('');
  
  const { data: services} = useGetServicesQuery();
  const { data: supplierType } = useGetSupplierTypesQuery();

  const uniqueServices = Array.from(new Set(services?.map(service => service.type)))
                           .map(type => services.find(service => service.type === type));

  const uniqueSupplierTypes = Array.from(new Set(supplierType?.map(type => type.category)))
                                 .map(category => supplierType.find(type => type.category === category));

  const handleFilter = () => {
    const filters = {
        budget: inputBudget,
        service: selectedService,
        supplierType: selectedSupplierType,
    };
    setQueryBudget(filters); // Actualiza el presupuesto para la consulta
  }

  const { data: products, isLoading, error } = useGetProductsQuery(queryBudget);

  return (
    <>
        <input 
            type="number" 
            value={inputBudget} 
            onChange={(e) => setInputBudget(e.target.value)} 
            placeholder="Ingrese su presupuesto" 
            className="filter-input"
        />
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="filter-input">
            <option value=''>Selecciona un Servicio</option>
            {uniqueServices?.map(service => (
                <option key={service._id} value={service._id}>{service.type}</option>
            ))}
        </select>

        <select value={selectedSupplierType} onChange={(e) => setSelectedSupplierType(e.target.value)} className="filter-input">
            <option value=''>Selecciona un Tipo de Proveedor</option>
            {uniqueSupplierTypes?.map(type => (
                <option key={type._id} value={type._id}>{type.category}</option>
            ))}
        </select>
        <button onClick={handleFilter} className="filter-button">Filtrar</button>

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
