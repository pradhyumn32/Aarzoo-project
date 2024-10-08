import React from 'react';

function SortingOptions({ onChange, value }){
  const options = [
    { label: 'Priority', value: 'Priority' },
    { label: 'Title', value: 'Title' },
  ];

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortingOptions;