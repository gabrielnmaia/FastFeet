import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import ReactSelect from 'react-select';

const Select = ({ name, options, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <ReactSelect
        defaultValue={
          defaultValue && options.find(option => option.value === defaultValue)
        }
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};
export default Select;
