import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Test that the navbar is rendered with the correct links
test("renders navbar with correct links", async () => {
  render(<App />);

  // Check that the links appear by their text content
  const homeLink = await screen.findByRole("link", { name: /home/i });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = await screen.findByRole("link", { name: /about/i });
  expect(aboutLink).toBeInTheDocument();

  const contactLink = await screen.findByRole("link", { name: /contact/i });
  expect(contactLink).toBeInTheDocument();

  const adminLink = await screen.findByRole("link", { name: /admin/i });
  expect(adminLink).toBeInTheDocument();

  const registerLink = await screen.findByRole("link", { name: /register/i });
  expect(registerLink).toBeInTheDocument();

  const loginLink = await screen.findByRole("link", { name: /log in/i });
  expect(loginLink).toBeInTheDocument();

});