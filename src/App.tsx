import { ToastContainer } from "react-toastify";
import "./App.scss";
import { useEffect, useState } from "react";
import { Seminar } from "./shared/seminar";
import { axiosInstance } from "./shared/axios";
import { Api } from "./shared/api-messages";

function App() {
  // const idk = fetch()
  // await axiosInstance.delete(`${Api.Seminars}/${card.seminar?.id}`).then(() => clearTimeout(resetTimeout));
  const [seminars, setSeminars] = useState<Seminar[] | null>(null);
  useEffect(() => {
    const fetchSeminars = async () => {
      const res = await axiosInstance.get<Seminar[]>(Api.Seminars, { params: { start: 0, limit: 5 } });
      setSeminars(res.data ?? null);
    };
    fetchSeminars();
  }, []);

  return (
    <>
      <ToastContainer hideProgressBar stacked />
    </>
  );
}

export default App;
