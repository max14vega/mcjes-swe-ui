import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Mock components
jest.mock("../../Components/SearchBar", () => () => <div>SearchBar Mock</div>);
jest.mock("../../Components/Slideshow", () => () => <div>Slideshow Mock</div>);

describe("HomePage Component", () => {
  test("renders page elements correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // Check if key elements like title and buttons are rendered
    expect(screen.getByText("Insects Here and Now")).toBeInTheDocument();
    expect(screen.getByText("Submit a Manuscript")).toBeInTheDocument();
    expect(screen.getByText("Browse Manuscripts")).toBeInTheDocument();
  });

  test("renders top journals section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // Check if the top journals section renders with titles
    expect(screen.getByText("Global Insect Ecology")).toBeInTheDocument();
    expect(
      screen.getByText("Arthropod Conservation Quarterly"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Parasitology and Vector Research"),
    ).toBeInTheDocument();
  });

  test("renders current works section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // Check if current works section renders titles
    expect(screen.getByText("Latest in Climate Change")).toBeInTheDocument();
    expect(screen.getByText("Innovations in Entomology")).toBeInTheDocument();
  });

  test("renders primary sources section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // Check if primary sources section renders titles
    expect(
      screen.getByText("Classical Texts on Insect Taxonomy"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Foundational Papers on Pollinator Ecology"),
    ).toBeInTheDocument();
  });

  test("renders research articles section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    // Check if research articles section renders titles
    expect(
      screen.getByText("Latest Trends in Pest Control Technologies"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Advancements in Insect Studies"),
    ).toBeInTheDocument();
  });
  test("navigates to browse manuscripts page when button is clicked", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const browseButton = screen.getByText("Browse Manuscripts");
    expect(browseButton.closest("a")).toHaveAttribute("href", "/manuscripts");
  });

  test("renders mocked SearchBar and Slideshow", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("SearchBar Mock")).toBeInTheDocument();
    expect(screen.getByText("Slideshow Mock")).toBeInTheDocument();
  });

  test("all sections have headings", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /top journals/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /current and relevant work/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /understanding bug behavior/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /research articles/i }),
    ).toBeInTheDocument();
  });

  test("does not crash if optional sections are missing", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Insects Here and Now")).toBeInTheDocument();
  });
});
