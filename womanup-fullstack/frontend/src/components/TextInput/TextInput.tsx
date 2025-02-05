import "./_textInput.scss";

const TextInput: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (
  props
) => {
  return <input className='textInput' {...props} />;
};

export default TextInput;
