import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ArticleDetails from "./ArticleDetails";
import { MemoryRouter } from "react-router";
import { ArticleType } from "../../../types/ArticleType";

jest.mock("../../../utils/dateUtils", () => ({
  __esModule: true,
  default: (date: string) => `Formatted: ${date}`,
}));

const mockArticle = {
  uri: "nyt://article/test-article",
  headline: { main: "Test Headline" },
  abstract: "This is a test abstract.",
  byline: { original: "By Test Author" },
  pub_date: "2025-01-01T12:00:00Z",
  web_url: "https://example.com/full-article",
  multimedia: {
    default: { url: "https://example.com/image.jpg" },
  },
} as ArticleType;

describe("ArticleDetails", () => {
  it("renders article details correctly", () => {
    render(
      <MemoryRouter>
        <ArticleDetails article={mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("This is a test abstract.")).toBeInTheDocument();
    expect(screen.getByText("By Test Author")).toBeInTheDocument();
    expect(screen.getByText(/Formatted:/)).toBeInTheDocument();

    const img = screen.getByAltText("Image Test Headline") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("https://example.com/image.jpg");

    const link = screen.getByRole("link", { name: /Read Full Article/i });
    expect(link).toHaveAttribute("href", "https://example.com/full-article");
  });

  it("renders without an image if multimedia is missing", () => {
    const articleWithoutImage = { ...mockArticle, multimedia: {} };

    render(
      <MemoryRouter>
        <ArticleDetails article={articleWithoutImage as ArticleType} />
      </MemoryRouter>
    );

    expect(
      screen.queryByAltText("Image Test Headline")
    ).not.toBeInTheDocument();
  });

  it("has a back to home link", () => {
    render(
      <MemoryRouter>
        <ArticleDetails article={mockArticle} />
      </MemoryRouter>
    );

    const backLink = screen.getByRole("link", { name: /Back to Home/i });
    expect(backLink).toHaveAttribute("href", "/");
  });
});
