import { use, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteCardUpdateUI, editCardUpdateUI } from "./components/card-list/ui-update";
import { CardList } from "./components/card-list/list";
import { CardProps } from "./components/card";
import { SeminarsContext } from "./shared/seminars-context";
import { ApiErrors } from "./shared/api-types";
import { Seminar } from "./shared/seminar";
import { replaceRange } from "./shared/array";
import "./App.scss";

function App() {
  const seminarsCtx = use(SeminarsContext);
  useEffect(() => {
    (async () => {
      await seminarsCtx.apiFetchSeminars<Seminar[]>(
        { from: 0, limit: 10 },
        () => toast(ApiErrors.appInitError),
        seminars => {
          if (!seminars) return;
          seminarsCtx.setSeminars(prev => replaceRange(prev ?? [], 0, 5, seminars));
        }
      );
    })();
  }, []);

  return (
    <>
      <CardList
        items={seminarsCtx.seminars?.map(
          s =>
            ({
              seminar: s,
              loading: false,
              onDeleteCb: deleteCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onDeleteCbFail"],
              // onDeleteCbFail: deleteCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onDeleteCb"],
              onEditCb: editCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onEditCb"] //ибо ещё ctx просит, мб стоит через .bind добавить
              // onEditCbFail: editCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onEditCbFail"] //ибо ещё ctx просит, мб стоит через .bind добавить
            } as CardProps)
        )}
        preloadSekeletonAmount={5}
        timeout={1000}
      />
      <ToastContainer hideProgressBar stacked />
    </>
  );
}

export default App;
