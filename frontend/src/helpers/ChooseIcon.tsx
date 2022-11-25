// type FilesExtensions = "png" | "jpg" | "jpeg" | "gif" | "txt" | "md";

const ChooseIcon: React.FC<{ extension: string }> = ({ extension }) => {
  return <img src={`icons/${extension}.svg`} alt={`иконка файла расширения ${extension}`} draggable={false} />;
};

export default ChooseIcon;
