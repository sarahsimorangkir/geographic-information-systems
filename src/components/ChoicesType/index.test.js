import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ChoicesType from "./";

it("renders multiple types correctly", () => {
  render(<ChoicesType />);

  const icons = screen.getAllByAltText("icon");
  expect(icons.length).toBe(2); 
});

it("calls onClick with the correct value", () => {
  const onClickMock = jest.fn();
  render(<ChoicesType onClick={onClickMock} />);

  const icons = screen.getAllByAltText("icon");
  fireEvent.click(icons[1]);

  expect(onClickMock).toHaveBeenCalledTimes(1);
  expect(onClickMock).toHaveBeenCalledWith(expect.anything(), {
    type: "plane",
    image: expect.any(String),
  });
});
