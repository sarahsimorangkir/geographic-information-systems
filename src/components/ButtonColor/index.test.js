import React from "react";
import { render, fireEvent, screen } from "@testing-library/react"; 
import ButtonColor from ".";

describe("ButtonColor Component", () => {
  it("renders correctly", () => {
    render(<ButtonColor text="Click Me" type="primary" color="blue" />);
    
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("buttonColor");
    expect(button).toHaveClass("primary");
    expect(button.textContent).toBe("Click Me");
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<ButtonColor text="Click Me" onClick={onClickMock} />);
    
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
