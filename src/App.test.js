import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
  //mock the google maps API loader
  const useJsApiLoader = jest.fn(() => ({ isLoaded: true }));
  
  const setMarkers = jest.fn();
  const setDetailSelected = jest.fn();
  const setShowModal = jest.fn();
  const setShowChoices = jest.fn();
  const setSelectedLocation = jest.fn();
  const setCenter = jest.fn();
  const setSidebarDetail = jest.fn();

  const defaultProps = {
    isLoaded: true, 
    setMarkers,
    setDetailSelected,
    setShowModal,
    setShowChoices,
    setSelectedLocation,
    setCenter,
    setSidebarDetail,
  };

  it('renders the component with loading text when Google Maps API is not loaded', () => {
    useJsApiLoader.mockReturnValue({ isLoaded: false }); 

    render(<App {...defaultProps} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});
