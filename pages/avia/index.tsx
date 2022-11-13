import { useState } from "react";
import Button from "../../components/Usual/Button/Button";
import Input from "../../components/Usual/Input/Input";

// import dynamic from "next/dynamic";
// const Input = dynamic(() => import('../../components/Usual/Input/Input'), {
//   ssr: false
// })

const AviaSearch: React.FC<{}> = () => {
  const [inputMock, setInputMock] = useState<string>(() =>
    new Date().toLocaleDateString("ru-RU").split(".").reverse().join("-")
  );
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMock(event.target.value);
  };

  return (
    <div>
      <Button onClick={() => {}}>Найти</Button>
      <Input label='Ввод текста' onChange={changeDate} value={inputMock} placeholder={"Введите текст"} type={"date"} />
    </div>
  );
};

export default AviaSearch;
