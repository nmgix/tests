import "./button.scss";

type ButtonProps = {
  title: string;
  onClick: () => any;
};

const Button: React.FC<ButtonProps> = ({ onClick, title }) => {
  return (
    <button className='button' onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
