import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ModalForm from "./";

describe("ModalForm Component", () => {
  const mockAfterSubmit = jest.fn();
  const mockCancel = jest.fn();

  const defaultProps = {
    type: "plane",
    points: { lat: 0, lng: 0 },
    showModal: true,
    afterSubmit: mockAfterSubmit,
    cancel: mockCancel,
  };

  it("renders correctly", () => {
    render(<ModalForm {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Latitude")).toBeInTheDocument();
    expect(screen.getByText("Longitude")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("does not call afterSubmit when 'Add' button is clicked with empty fields", async () => {
    render(<ModalForm {...defaultProps} />);
    const addButton = screen.getByText("Add");
  
    fireEvent.click(addButton);

    expect(mockAfterSubmit).not.toHaveBeenCalled();
  });
  

  it("calls cancel when 'Cancel' button is clicked", () => {
    render(<ModalForm {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });
});
