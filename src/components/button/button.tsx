import './button.css';

const Button = (props: any) => {
  return (
    <button {...props} className="button">
      {props.children}
    </button>
  );
};
export default Button;
