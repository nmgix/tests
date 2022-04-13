export interface DefaultState {
  state:
    | (string | number | boolean | null)
    | (string[] | number[] | boolean[])
    | { [x: string]: string | number | boolean | null }
    | { [x: string]: string | number | boolean | null }[]
    | {
        [x: string]:
          | string
          | number
          | boolean
          | null
          | { [x: string]: string | number | boolean | null | { [x: string]: string | number | boolean | null } }[];
      }
    | null;

  error?: (string | number | boolean) | (string[] | number[]) | null;
}

// export class DefaultError extends String {
//   constructor(errorMsg: string = "Произошла ошибка при выполнении запроса") {
//     super(errorMsg);
//   }
// }
