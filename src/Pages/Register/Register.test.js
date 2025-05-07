import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Register from "../Register";

describe("Register Page", () => {
  test("renders all form fields correctly", () => {
    render(<Register />);
    // Check if all form fields are rendered
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Select role"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Re-enter your password"),
    ).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    render(<Register />);
    fireEvent.click(screen.getByText("Register"));
    // Check for required field validation messages
    await waitFor(() => {
      expect(screen.getByText("Name is required.")).toBeInTheDocument();
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(screen.getByText("Role is required.")).toBeInTheDocument();
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
      expect(
        screen.getByText("Please confirm your password."),
      ).toBeInTheDocument();
    });
  });

  //TO DO
  // TEST FOR EMAIL VALIDATION

  test("validates password length", async () => {
    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Register"));
    // Check for password length validation
    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters long."),
      ).toBeInTheDocument();
    });
  });

  test("validates password confirmation", async () => {
    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "differentpassword123" },
    });
    fireEvent.click(screen.getByText("Register"));
    // Check for password match validation
    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
  });
  //TODO
  //ADD TEST FOR FORM SUBMISSION VALIDATION
});
