export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  activeUntil: string;
  attachments: string[];
}
