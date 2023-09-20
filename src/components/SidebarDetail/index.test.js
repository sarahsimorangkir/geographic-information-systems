import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SidebarDetail from "./";

describe("SidebarDetail Component", () => {
  const mockDetail = {
    name: "Test Object",
    additional_info: {
      features: [
        {
          geometry: {
            coordinates: [10.1234, 20.5678, 30.9876],
          },
        },
      ],
    },
  };

  const mockClose = jest.fn();

  it("renders the detail information correctly", () => {
    render(<SidebarDetail detail={mockDetail} showDetail={true} close={mockClose} />);
  
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Test Object")).toBeInTheDocument();
    expect(screen.getByText("Longitude")).toBeInTheDocument();
    expect(screen.getByText("10.1234")).toBeInTheDocument();
    expect(screen.getByText("Latitude")).toBeInTheDocument();
    expect(screen.getByText("20.5678")).toBeInTheDocument();
    expect(screen.getByText("Altitude")).toBeInTheDocument();
    expect(screen.getByText("30.9876")).toBeInTheDocument();
  
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
  
  

  it("calls the close function when 'Close' button is clicked", () => {
    render(<SidebarDetail detail={mockDetail} showDetail={true} close={mockClose} />);
    const closeButton = screen.getByText("Close");

    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  
});
