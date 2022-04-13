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
      };

  error?: (string | number | boolean) | (string[] | number[]);
}
