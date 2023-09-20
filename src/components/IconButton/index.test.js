import { render, fireEvent, screen } from "@testing-library/react";
import IconButton from "./";

describe("IconButton Component", () => {
  it("renders the button icon correctly", () => {
    const mockOnClick = jest.fn();

    // Render the IconButton component with the required props
    render(<IconButton image="icon.png" onClick={mockOnClick} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
