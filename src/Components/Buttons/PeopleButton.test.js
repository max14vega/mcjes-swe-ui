import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PeopleButton from "./PeopleButton"; // Import the PeopleButton component
import { PeopleAPI } from "../../Client/API";

// Mock the PeopleAPI to control the behavior of the data fetching
jest.mock("../../Client/API");

describe("PeopleButton Component", () => {
  test("shows error alert when fetching fails", async () => {
    // Mock the API to throw an error
    PeopleAPI.getPeople.mockRejectedValue(new Error("Failed to fetch"));

    render(<PeopleButton />);

    // Simulate clicking the "Fetch People" button
    fireEvent.click(screen.getByText("Fetch People"));

    // Wait for the error alert to be displayed
    await waitFor(() => screen.getByText("Failed to fetch people."));

    // Check if the error alert is shown
    expect(screen.getByText("Failed to fetch people.")).toBeInTheDocument();
  });
});
