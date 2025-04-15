import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar with correct links", async () => {
  render(<App />);

  const homeButtons = await screen.findAllByText(/home/i);
  expect(homeButtons.length).toBeGreaterThan(0);

  const aboutButtons = await screen.findAllByText(/about/i);
  expect(aboutButtons.length).toBeGreaterThan(0);

  const contactButtons = await screen.findAllByText(/contact us/i);
  expect(contactButtons.length).toBeGreaterThan(0);

  const adminButtons = await screen.findAllByText(/admin/i);
  expect(adminButtons.length).toBeGreaterThan(0);

  const registerButtons = await screen.findAllByText(/register/i);
  expect(registerButtons.length).toBeGreaterThan(0);

  const loginButtons = await screen.findAllByText(/log in/i);
  expect(loginButtons.length).toBeGreaterThan(0);
});
