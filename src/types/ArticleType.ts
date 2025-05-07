export type ArticleType = {
  title?: string;
  abstract?: string;
  published_date?: string;
  multimedia?: {
    default: {
      url: string;
    };
  };
  uri: string;
  byline: {
    original: string;
  };
  headline: {
    main: string;
  };
  web_url?: string;
  pub_date: string;
};
