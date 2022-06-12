export type CargoItem = {
  date: Date;
  name: string;
  distance: number;
  count: number;
  id?: number;
};

export type CompareType = {
  id: number;
  text?: string;
  compareFunction?: (array: CargoItem[], column: string, searchString: string) => CargoItem[];
};

export type SortingData = {
  column: string;
  compare: CompareType;
  search: string;
};
export type SortingWindowProps = {
  open: boolean;
  sortingData: SortingData;
};

export const filterOptions: CompareType[] = [
  {
    text: "Не выбрано",
    id: 0,
  },
  {
    text: "Меньше",
    id: 1,
    compareFunction: (array: CargoItem[], column: string, searchString: string) => {
      var columnType = array[0][column as keyof CargoItem];
      // console.log(array, column, searchString);
      // console.log(typeof columnType, columnType, searchString, array);

      if (searchString && typeof columnType === ("number" || "string")) {
        console.log(1);
        return array.filter((element) => element[column as keyof CargoItem]! < searchString);
      } else if (typeof columnType === "string") {
        console.log(2);
        return array.sort((a, b) =>
          String(a[column as keyof CargoItem]!).localeCompare(String(b[column as keyof CargoItem]!))
        );
      } else if (typeof columnType === "number") {
        console.log(3);
        return array.sort(
          (a, b) => (a[column as keyof CargoItem]! as number) - (b[column as keyof CargoItem]! as number)
        );
      } else {
        console.log(4);
        return array;
      }
    },
  },
  {
    text: "Больше",
    id: 2,
    compareFunction: (array: CargoItem[], column: string, searchString: string) => {
      var columnType = array[0][column as keyof CargoItem];

      // console.log(array, column, searchString);

      if (searchString && typeof columnType === ("number" || "string")) {
        return array.filter((element) => element[column as keyof CargoItem]! > searchString);
      } else if (typeof columnType === "string") {
        return array.sort((a, b) =>
          String(b[column as keyof CargoItem]!).localeCompare(String(a[column as keyof CargoItem]!))
        );
      } else if (typeof columnType === "number") {
        return array.sort(
          (a, b) => (b[column as keyof CargoItem]! as number) - (a[column as keyof CargoItem]! as number)
        );
      } else {
        return array;
      }
    },
  },
  {
    text: "Равно",
    id: 3,
    compareFunction: (array: CargoItem[], column: string, searchString: string) => {
      var columnType = array[0][column as keyof CargoItem];

      if (searchString && typeof columnType === ("number" || "string")) {
        return array.filter((element) => element[column as keyof CargoItem]! > searchString);
      } else {
        return [];
      }
    },
  },
  {
    text: "Содержит",
    id: 4,
    compareFunction: (array: CargoItem[], column: string, searchString: string) => {
      var columnType = array[0][column as keyof CargoItem];

      if (searchString && typeof columnType === ("number" || "string")) {
        return array.filter((element) => String(element[column as keyof CargoItem]!).includes(searchString));
      } else {
        return [];
      }
    },
  },
];
