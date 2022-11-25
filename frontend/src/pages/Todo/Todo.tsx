import { useParams } from "react-router";

const Todo: React.FC = () => {
  const params = useParams();
  console.log(params);

  return <div>todo</div>;
};

export default Todo;
