import "./_button.scss";

const Button: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (
  props
) => {
  return <button className='button' {...props} />;
};

export default Button;
