import axios from 'axios';
import { addTrack } from './api'; 

// Mock axios to avoid making actual HTTP requests
jest.mock('axios');

describe('addTrack Function', () => {
  // Restore the original axios behavior after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful POST request and call the success callback', async () => {
    // Mock a successful axios response
    const mockData = {
      data: {
        data: {
          additional_info: {
            features: [
              {
                geometry: {
                  coordinates: [1, 2, 3],
                  type: 'plane',
                },
                properties: '-',
                type: 'plane',
              },
            ],
            type: 'plane',
          },
          name: 'Test Name',
          track_id: '12345',
          track_name: 'plane-track-12345',
        },
      },
    };

    axios.post.mockResolvedValue(mockData);

    // Mock the success and error callback functions
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    // Call the addTrack function
    await addTrack(
      {
        name: 'Test Name',
        lat: 1,
        lng: 2,
        alt: 3,
        type: 'plane',
      },
      successCallback,
      errorCallback
    );

    // Check if the success callback was called with the expected data
    expect(successCallback).toHaveBeenCalledWith(mockData.data.data);

    // Ensure that axios.post was called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      '/track',
      expect.objectContaining({
        additional_info: {
          features: expect.any(Array),
          type: 'plane',
        },
        name: 'Test Name',
        track_id: expect.any(String),
        track_name: expect.any(String),
      })
    );

    // Ensure that the error callback was not called
    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('should handle an error and call the error callback', async () => {
    // Mock an error response from axios
    const error = new Error('Failed to make the request');
    axios.post.mockRejectedValue(error);

    // Mock the success and error callback functions
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    // Call the addTrack function
    await addTrack(
      {
        name: 'Test Name',
        lat: 1,
        lng: 2,
        alt: 3,
        type: 'plane',
      },
      successCallback,
      errorCallback
    );

    // Ensure that the error callback was called with the expected error
    expect(errorCallback).toHaveBeenCalledWith(error);

    // Ensure that axios.post was called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object));

    // Ensure that the success callback was not called
    expect(successCallback).not.toHaveBeenCalled();
  });
});
