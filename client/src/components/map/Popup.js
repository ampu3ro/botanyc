import React from 'react';

const Popup = ({ properties }) => {
  const { id, name, address } = properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {address}
    </div>
  );
};

export default Popup;
