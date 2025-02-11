import { toast, ToastContainer } from "react-toastify";
import "./App.scss";
import { use, useEffect } from "react";
import { SeminarsContext } from "./shared/seminars-context";
import { CardList } from "./components/card-list/list";

function App() {
  // const idk = fetch()
  // await axiosInstance.delete(`${Api.Seminars}/${card.seminar?.id}`).then(() => clearTimeout(resetTimeout));
  // const [seminars, setSeminars] = useState<Seminar[] | null>(null);
  // useEffect(() => {
  //   const fetchSeminars = async () => {
  //     const res = await axiosInstance.get<Seminar[]>(Api.Seminars, { params: { start: 0, limit: 5 } });
  //     setSeminars(res.data ?? null);
  //   };
  //   fetchSeminars();
  // }, []);
  const seminarsCtx = use(SeminarsContext)
  useEffect(() => {
    seminarsCtx.apiFetchSeminars(0, 5, () => toast("Ошибка при загрузке данных"))
  }, [])

  return (
    <>
      <CardList items={seminarsCtx.seminars}/>
      <ToastContainer hideProgressBar stacked />
    </>
  );
}

export default App;
