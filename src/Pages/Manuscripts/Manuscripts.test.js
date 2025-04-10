import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import * as ManuscriptsAPI from "../../Client/API";
import Manuscripts from "./Manuscripts";
import "@testing-library/jest-dom";

jest.mock("../../Client/API", () => ({
  getManuscripts: jest.fn(),
  addManuscript: jest.fn(),
}));

describe.skip("Manuscripts page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders manuscripts from API", async () => {
    ManuscriptsAPI.getManuscripts.mockResolvedValueOnce({
      1: {
        id: "1",
        title: "Manuscript A",
        author_first_name: "Alice",
        author_last_name: "Writer",
      },
      2: {
        id: "2",
        title: "Manuscript B",
        author_first_name: "Bob",
        author_last_name: "Author",
      },
    });

    render(<Manuscripts />);

    await waitFor(() => {
      expect(screen.getByText(/Manuscript A/i)).toBeInTheDocument();
      expect(screen.getByText(/Manuscript B/i)).toBeInTheDocument();
    });
  });

  test("calls addManuscript when submitting", async () => {
    ManuscriptsAPI.getManuscripts.mockResolvedValueOnce({
      1: {
        id: "1",
        title: "Existing Manuscript",
        author_first_name: "First",
        author_last_name: "Author",
      },
    });

    ManuscriptsAPI.addManuscript.mockResolvedValueOnce({
      id: "3",
      title: "New Manuscript",
      author_first_name: "New",
      author_last_name: "Author",
    });

    render(<Manuscripts />);

    await waitFor(() => {
      expect(screen.getByText(/Existing Manuscript/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", {
      name: /submit manuscript/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(ManuscriptsAPI.addManuscript).toHaveBeenCalled();
    });
  });

  test("displays error alert when manuscript fetch fails", async () => {
    ManuscriptsAPI.getManuscripts.mockRejectedValueOnce(new Error("Failed"));

    render(<Manuscripts />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /failed to fetch manuscripts/i,
      );
    });
  });
});
