import { fireEvent, render, waitFor, act } from "@testing-library/react";
import React from "react";
import Manuscript from "./Manuscripts";
import { ManuscriptsAPI } from "../../Client/API";  // Update this path to the correct location

jest.mock('./ManuscriptsAPI');  // Mock the API calls

describe("Manuscript component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Manuscript />);
    expect(getByText("Filter")).toBeInTheDocument();
    expect(getByText("Search by title or author")).toBeInTheDocument();
    expect(getByText("Submit Manuscript")).toBeInTheDocument();
  });

  it("displays error message when fetching manuscripts fails", async () => {
    // Mock the API call to simulate failure
    ManuscriptsAPI.getManuscripts.mockImplementationOnce(() => {
      return Promise.reject(new Error("Failed to fetch manuscripts"));
    });

    const { getByText } = render(<Manuscript />);

    await act(async () => {
      await waitFor(() => getByText("Failed to fetch manuscripts."));
    });
  });

  it("handles successful manuscript fetch", async () => {
    // Mock a successful API response
    ManuscriptsAPI.getManuscripts.mockImplementationOnce(() => 
      Promise.resolve([{ title: "Manuscript 1", author: "Author 1" }])
    );

    const { getByText } = render(<Manuscript />);

    await act(async () => {
      // Wait for manuscripts to be displayed
      await waitFor(() => getByText("Manuscript 1"));
    });

    expect(getByText("Manuscript 1")).toBeInTheDocument();
  });
});
