import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

// Mock components
jest.mock("../../Components/SearchBar", () => () => <div>SearchBar Mock</div>);
jest.mock("../../Components/Slideshow", () => () => <div>Slideshow Mock</div>);

describe("HomePage Component", () => {
  test("renders page elements correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
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
      </MemoryRouter>
    );
    // Check if the top journals section renders with titles
    expect(screen.getByText("Global Insect Ecology")).toBeInTheDocument();
    expect(screen.getByText("Arthropod Conservation Quarterly")).toBeInTheDocument();
    expect(screen.getByText("Parasitology and Vector Research")).toBeInTheDocument();
  });


  test("renders current works section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Check if current works section renders titles
    expect(screen.getByText("Latest in Climate Change")).toBeInTheDocument();
    expect(screen.getByText("Innovations in Entomology")).toBeInTheDocument();
  });

  test("renders primary sources section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Check if primary sources section renders titles
    expect(screen.getByText("Classical Texts on Insect Taxonomy")).toBeInTheDocument();
    expect(screen.getByText("Foundational Papers on Pollinator Ecology")).toBeInTheDocument();
  });

  test("renders research articles section correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Check if research articles section renders titles
    expect(screen.getByText("Latest Trends in Pest Control Technologies")).toBeInTheDocument();
    expect(screen.getByText("Advancements in Insect Studies")).toBeInTheDocument();
  });
});
