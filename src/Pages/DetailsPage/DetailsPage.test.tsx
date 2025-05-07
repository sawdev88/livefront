import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DetailsPage from "./index";
import type { ArticleType } from "../../types/ArticleType";

beforeAll(() => {
  window.scrollTo = jest.fn();
});

jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));

jest.mock("./hooks/useGetArticleDetails", () => ({
  useGetArticleDetails: jest.fn(),
}));

jest.mock("./components/Skeleton", () => () => (
  <div className="loading-skeleton">Loading...</div>
));
jest.mock("../../components/Error", () => () => (
  <div className="error-message">Error!</div>
));
jest.mock("./components/ArticleDetails", () => (article: ArticleType) => (
  <div className="article-details">Article: {article?.title}</div>
));

import { useParams } from "react-router";
import { useGetArticleDetails } from "./hooks/useGetArticleDetails";

const mockedUseParams = useParams as jest.Mock;
const mockedUseGetArticleDetails = useGetArticleDetails as jest.Mock;

describe("DetailsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Skeleton while fetching", () => {
    mockedUseParams.mockReturnValue({ uri: "nyt://article/abc123" });
    mockedUseGetArticleDetails.mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    });

    render(<DetailsPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders Error on error", () => {
    mockedUseParams.mockReturnValue({ uri: "nyt://article/abc123" });
    mockedUseGetArticleDetails.mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
    });

    render(<DetailsPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test("renders Error if no data", () => {
    mockedUseParams.mockReturnValue({ uri: "nyt://article/abc123" });
    mockedUseGetArticleDetails.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    });

    render(<DetailsPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
