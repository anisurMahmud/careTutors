
import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleFilter = () => {
    onFilter({ name, price });
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filter;
