import React from 'react';

function GroupingOptions({ onChange, value }){
  const options = [
    { label: 'By Status', value: 'By Status' },
    { label: 'By User', value: 'By User' },
    { label: 'By Priority', value: 'By Priority' },
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

export default GroupingOptions;