import { render, screen } from "@testing-library/react";
import App from "./App";

test("shows the landing page agreement button", () => {
    render(<App />);
    const agreeButton = screen.getByRole("button", { name: /i agree/i });
    expect(agreeButton).toBeInTheDocument();
});
