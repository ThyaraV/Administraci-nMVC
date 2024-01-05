import React from 'react';
import { useGetUserPreferencesQuery } from '../slices/orderApiSlice'; // Asegúrate de usar la ruta correcta

const RecommendationScreen = () => {
  const { data: userPreferences, isLoading, isError } = useGetUserPreferencesQuery();

    // Verifica si se está cargando la información
    if (isLoading) return <div>Cargando...</div>;

    // Verifica si hubo algún error en la carga
    if (isError) return <div>Error al cargar las recomendaciones</div>;

    // Aquí puedes interpretar las preferencias del usuario para hacer recomendaciones
    // Por ejemplo, si las preferencias incluyen tipos de servicios más populares
    const popularServices = userPreferences?.serviceTypes;
    const popularSupplierTypes = userPreferences?.supplierTypes;

    return (
        <div>
            <h2>Recomendaciones para Ti</h2>
            {/* Aquí se pueden mostrar recomendaciones basadas en los servicios y tipos de proveedores populares */}
            <div>
                <h3>Servicios Populares</h3>
                {popularServices ? (
                    Object.entries(popularServices).map(([service, count]) => (
                        <p key={service}>{service} (Solicitado {count} veces)</p>
                    ))
                ) : <p>No hay suficientes datos para mostrar servicios populares.</p>}
            </div>
            <div>
                <h3>Tipos de Proveedores Populares</h3>
                {popularSupplierTypes ? (
                    Object.entries(popularSupplierTypes).map(([type, count]) => (
                        <p key={type}>{type} (Solicitado {count} veces)</p>
                    ))
                ) : <p>No hay suficientes datos para mostrar tipos de proveedores populares.</p>}
            </div>
        </div>
    );
};

export default RecommendationScreen;
