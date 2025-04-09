import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar with correct links", async () => {
  render(<App />);

  const homeButton = await screen.findByText(/home/i);
  expect(homeButton).toBeInTheDocument();

  const aboutButton = await screen.findByText(/about/i);
  expect(aboutButton).toBeInTheDocument();

  const contactButton = await screen.findByText(/contact us/i);
  expect(contactButton).toBeInTheDocument();

  const adminButton = await screen.findByText(/admin/i);
  expect(adminButton).toBeInTheDocument();

  const registerButton = await screen.findByText(/register/i);
  expect(registerButton).toBeInTheDocument();

  const loginButton = await screen.findByText(/log in/i);
  expect(loginButton).toBeInTheDocument();
});
