// minimal types
export type NewsType = {
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  multimedia: {
    url: string;
    format?: string;
    caption?: string;
    type?: string;
    copyright?: string;
  }[];
  url?: string;
  uri: string;
  section?: string;
};
