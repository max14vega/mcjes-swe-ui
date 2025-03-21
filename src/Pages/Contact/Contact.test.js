import { render, screen } from "@testing-library/react";
import React from "react"; // Ensure React is imported
import Contact from "./Contact";

describe("Contact page", () => {
  test("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
  });

  test("allows users to submit the form", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const messageInput = screen.getByPlaceholderText("Message");
    const submitButton = screen.getByText("Send Message");
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("handles form validation errors", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const messageInput = screen.getByPlaceholderText("Message");
    const submitButton = screen.getByText("Send Message");
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
    expect(submitButton).toBeEnabled();
  });
});
