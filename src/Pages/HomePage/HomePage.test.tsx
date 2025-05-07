import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "./index";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("./hooks/useGetTopNews", () => ({
  useGetTopNews: jest.fn(),
}));

import { useGetTopNews } from "./hooks/useGetTopNews";

// 👇 Tell TypeScript this is now a Jest mock
const mockedUseGetTopNews = useGetTopNews as jest.Mock;

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state", () => {
    mockedUseGetTopNews.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    expect(document.querySelector(".loading-spinner")).toBeInTheDocument();
  });

  test("shows error state", () => {
    mockedUseGetTopNews.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test("shows no news message when data is empty", () => {
    mockedUseGetTopNews.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/no news available/i)).toBeInTheDocument();
  });

  test("renders news tiles when data is available", () => {
    const mockNews = [
      {
        uri: "nyt://article/abc123",
        title: "Test Article",
        abstract: "This is a test article.",
        byline: "By Test Author",
        multimedia: [{ url: "test.jpg" }],
        published_date: "2025-05-06",
      },
    ];

    mockedUseGetTopNews.mockReturnValue({
      data: mockNews,
      isPending: false,
      isError: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  test("navigates to article details when a tile is clicked", () => {
    const mockNews = [
      {
        uri: "nyt://article/abc123",
        title: "Test Article",
        abstract: "This is a test article.",
        byline: "By Test Author",
        multimedia: [{ url: "test.jpg" }],
        published_date: "2025-05-06",
      },
    ];

    mockedUseGetTopNews.mockReturnValue({
      data: mockNews,
      isPending: false,
      isError: false,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    const article = screen.getByText("Test Article");
    fireEvent.click(article);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${encodeURIComponent("nyt://article/abc123")}`
    );
  });
});
