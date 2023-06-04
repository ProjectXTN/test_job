import { render, screen, waitFor } from "@testing-library/react";
import Quiz1 from "../src/pages/Quiz1/index";
import { server } from "../src/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders Quiz1 component", () => {
  render(<Quiz1 />);
  const titleElement = screen.getByText(/Teste tes connaissances sur l'environnement/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders 'Question suivant' button", async () => {
  render(<Quiz1 />);
  await waitFor(() => {
    setTimeout(() => {
      const buttonElement = screen.getByText(/Question suivant/i);
      expect(buttonElement).toBeInTheDocument();
    }, 1000);
  });
});

