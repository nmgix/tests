export type ApodData = {
  apod: ApodImage;
};

export type ApodImage = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
};
