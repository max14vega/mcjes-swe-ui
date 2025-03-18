// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

//for nav bar screen minimizing
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query.includes("(max-width: 600px)"), // Simulates matches for specific queries
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated but included for completeness
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
});
