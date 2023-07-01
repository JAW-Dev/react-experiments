import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

const FormInput = ({ label, handleChange, type, name, value, icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ gap: '8px' }} className="flex flex-col">
      {label && <label className="text-sm uppercase text-charcoal font-inter font-bold">
        {label}
      </label>}
      <div
        className={`px-4 py-4 flex items-center rounded-lg border-2 ${
          isFocused && ' border-purple'
        }`}
      >
        {icon && <SVG className="mr-4" src={icon} />}
        <input
          className="focus:outline-none w-full"
          type={type}
          name={name}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default FormInput;
