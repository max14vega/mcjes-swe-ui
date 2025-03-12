import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("renders input field with placeholder", () => {
    render(<SearchBar placeholder="Search items..." onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText("Search items...");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<SearchBar placeholder="Search..." onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "Test Query" } });
    expect(inputElement.value).toBe("Test Query");
  });

  test("calls onSearch when Enter is pressed", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar placeholder="Search..." onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "Test Query" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: "Enter" });
  });
});
