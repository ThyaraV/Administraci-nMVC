import React, { useState } from 'react';

const FilterScreen = () => {
  // Estados para almacenar los valores de los campos
  const [presupuesto, setPresupuesto] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [servicios, setServicios] = useState([]);

  // Manejar cambios en el campo de presupuesto
  const handlePresupuestoChange = (e) => {
    setPresupuesto(e.target.value);
  };

  // Manejar cambios en el campo de tipo de evento
  const handleTipoEventoChange = (e) => {
    setTipoEvento(e.target.value);
  };

  // Manejar cambios en el campo de servicios
  const handleServiciosChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setServicios(selectedOptions);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer algo con los valores, como enviarlos a tu servidor
    console.log('Presupuesto:', presupuesto);
    console.log('Tipo de evento:', tipoEvento);
    console.log('Servicios:', servicios);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Presupuesto:
        <input type="text" value={presupuesto} onChange={handlePresupuestoChange} />
      </label>

      <label>
        Tipo de Evento:
        <select value={tipoEvento} onChange={handleTipoEventoChange}>
          <option value="">Seleccionar</option>
          <option value="fiesta">Fiesta</option>
          <option value="boda">Boda</option>
          <option value="graduacion">Graduación</option>
          <option value="conferencia">Conferencia</option>
        </select>
      </label>

      <label>
        Servicios:
        <select multiple value={servicios} onChange={handleServiciosChange}>
          <option value="catering">Catering</option>
          <option value="decoracion">Decoración</option>
          <option value="musica">Música</option>
          <option value="fotografo">Fotógrafo</option>
          <option value="carpas">Carpas</option>
        </select>
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
};



export default FilterScreen