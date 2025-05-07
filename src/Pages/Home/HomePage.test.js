import { act, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Mock API
jest.mock("../../Client/API", () => ({
  ManuscriptsAPI: {
    getManuscripts: jest.fn().mockResolvedValue({
      1: {
        manuscript_key: 1,
        title: "Latest Trends in Pest Control Technologies",
        abstract: "A comprehensive review of modern pest control methods.",
        author_first_name: "Jane",
        author_last_name: "Bugsy",
      },
      2: {
        manuscript_key: 2,
        title: "Advancements in Insect Studies",
        abstract: "Exploring insect behavior breakthroughs.",
        author_first_name: "John",
        author_last_name: "Antenna",
      },
    }),
  },
}));

// Mock shared components
jest.mock("../../Components/SearchBar", () => () => <div>SearchBar Mock</div>);

describe("HomePage Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });
  });

  test("renders core text and buttons", () => {
    expect(screen.getByText("Insects Here and Now")).toBeInTheDocument();
    expect(screen.getByText("Submit a Manuscript")).toBeInTheDocument();
    expect(screen.getByText("Browse Manuscripts")).toBeInTheDocument();
  });

  test("renders manuscripts fetched from API", () => {
    expect(
      screen.getAllByText("Latest Trends in Pest Control Technologies").length
    ).toBeGreaterThan(0);
  
    expect(
      screen.getAllByText("Advancements in Insect Studies").length
    ).toBeGreaterThan(0);
  
    expect(
      screen.getAllByText("A comprehensive review of modern pest control methods.").length
    ).toBeGreaterThan(0);
  
    expect(
      screen.getAllByText("Exploring insect behavior breakthroughs.").length
    ).toBeGreaterThan(0);
  });

  test("buttons navigate correctly", () => {
    const browseBtn = screen.getByText("Browse Manuscripts");
    expect(browseBtn.closest("a")).toHaveAttribute("href", "/manuscripts");
  });

  test("renders SearchBar", () => {
    expect(screen.getByText("SearchBar Mock")).toBeInTheDocument();
  });

  test("renders visible section headings", () => {
    expect(
      screen.getByRole("heading", { name: /top journals/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /current and relevant work/i })
    ).toBeInTheDocument();
  });

  test("does not crash if optional sections are missing", () => {
    expect(screen.getByText("Insects Here and Now")).toBeInTheDocument();
  });
});
