import {useEffect, useState} from 'react';
import './input.css';

const Input = (props: any) => {
  const [val, setVal] = useState(props.value || '');
  const handleOnChange = (event: {target: {value: string}}) => {
    setVal(event.target.value);
  };
  useEffect(() => {
    props.getValue(val);
  });
  return (
    <input value={val} onChange={handleOnChange} className="input"></input>
  );
};

export default Input;
