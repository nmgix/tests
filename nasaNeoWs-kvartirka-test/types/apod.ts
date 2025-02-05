export type ApodData = {
  apod: ApodImage;
};

export type ApodImage = {
  date: string;
  explanation: string;
  title: string;
  url: string;
  copyright?: string;
  hdurl?: string;
  media_type?: "video";
};
