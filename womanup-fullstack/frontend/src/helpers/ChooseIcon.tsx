const ChooseIcon: React.FC<{ name: string }> = ({ name }) => {
  return <img src={`/icons/${name}.svg`} alt={`иконка файла расширения ${name}`} draggable={false} />;
};

export default ChooseIcon;
