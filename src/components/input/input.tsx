import {useEffect, useState} from 'react';
import './input.css';

const Input = (props: any) => {
  const [val, setVal] = useState(props?.value || '');
  const handleOnChange = (event: {target: {value: string}}) => {
    setVal(event.target.value);
  };
  useEffect(() => {
    props.getValue(val);
  }, [props, val]);
  return (
    <input
      className="input"
      value={val}
      onChange={handleOnChange}
      placeholder={props?.placeholder}></input>
  );
};

export default Input;
