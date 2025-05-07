import { render, screen, fireEvent } from "@testing-library/react";
import Tile from "./Tile";
import "@testing-library/jest-dom";
import formatDate from "../../../utils/dateUtils";
import type { NewsType } from "../../../types/NewsType";

describe("Tile component", () => {
  const mockNews: NewsType = {
    uri: "nyt://article/1234",
    title: "Test Article",
    abstract: "This is a test abstract.",
    byline: "By John Doe",
    published_date: "2025-01-01T12:00:00Z",
    multimedia: [{ url: "https://example.com/image.jpg" }],
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(<Tile news={mockNews} onArticleClick={mockOnClick} />);
  });

  it("renders the title, abstract, byline, and formatted date", () => {
    expect(screen.getByText(mockNews.title)).toBeInTheDocument();
    expect(screen.getByText(mockNews.abstract)).toBeInTheDocument();
    expect(screen.getByText(mockNews.byline)).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(mockNews.published_date))
    ).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    const img = screen.getByAltText(
      `Image ${mockNews.title}`
    ) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockNews.multimedia[0].url);
  });

  it("calls onArticleClick with the correct uri when clicked", () => {
    const tile = screen.getByText(mockNews.title).closest("div");
    expect(tile).toBeInTheDocument();
    fireEvent.click(tile!);
    expect(mockOnClick).toHaveBeenCalledWith(mockNews.uri);
  });
});
