import { Seminar } from "@/shared/seminar";
import { ISeminarsContext } from "@/shared/seminars-context";

export const editCardUpdateUI = (
  seminarsCtx: ISeminarsContext,
  newSeminar: {
    id: number;
  } & Partial<Seminar>
) => {
  seminarsCtx.setSeminars(prev => {
    if (!prev || !seminarsCtx.seminars) {
      console.log("no prev array");
      return null;
    }
    const prevDataIdx = seminarsCtx.seminars?.findIndex(s => s.id == newSeminar.id);
    if (prevDataIdx < 0) {
      console.log("didnt find card with this id");
      return prev;
    }
    const prevData = seminarsCtx.seminars[prevDataIdx];
    if (!prevData) {
      console.log("prev data not found");
      return prev;
    }

    const newData = {
      id: newSeminar?.id ?? prevData?.id ?? -1,
      date: newSeminar?.date ?? prevData?.date ?? "01.01.1970",
      description: newSeminar?.description ?? prevData?.description ?? "ошибка при обновлении описания",
      photo: newSeminar?.photo ?? prevData?.photo ?? "ошибка при обновлении фото",
      time: newSeminar?.time ?? prevData?.time ?? "00:00",
      title: newSeminar?.title ?? prevData?.title ?? "ошибка при обновлении заголовка"
    };
    // надежнее было бы новый стейт с апи запросить, наверное
    return prev.map(pSeminar => (pSeminar.id !== prevData.id ? pSeminar : { ...pSeminar, ...newData }));
  });
};

export const deleteCardUpdateUI = (seminarsCtx: ISeminarsContext, deleteSeminar?: Seminar) => {
  if (!deleteSeminar) {
    console.log("no seminar passed");
    return;
  }
  seminarsCtx.setSeminars(prev => (prev ? prev.filter(prevSeminar => prevSeminar.id !== deleteSeminar.id) : []));
};
