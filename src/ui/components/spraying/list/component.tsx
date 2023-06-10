import React, { useState, useEffect } from 'react';

const List = ({ sprayings }) => {
  return (
    <>
      <ul>
        {sprayings.map((s) => (
          <li key={s.id}>{new Date(s.date).toLocaleString()}</li>
        ))}
      </ul>
    </>
  );
};

export default List;
