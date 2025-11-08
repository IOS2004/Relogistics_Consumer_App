import axios from "axios";

// Mock API base URL (replace with real API in production)
const API_BASE_URL = "https://api.relogistics.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock API responses - in production, these would make real HTTP calls

export const authAPI = {
  login: async (email, password, role) => {
    // Mock login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: role === "consumer" ? "C001" : "A001",
              email,
              name: role === "consumer" ? "John Doe" : "Agent Smith",
              phone: "+1234567890",
              role,
            },
            token: "mock_jwt_token_" + Date.now(),
          },
        });
      }, 1000);
    });
  },

  register: async (name, email, password, phone, role) => {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: role === "consumer" ? "C" + Date.now() : "A" + Date.now(),
              email,
              name,
              phone,
              role,
            },
            token: "mock_jwt_token_" + Date.now(),
          },
        });
      }, 1000);
    });
  },

  updateProfile: async (userId, profileData) => {
    // Mock profile update
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            user: { id: userId, ...profileData },
          },
        });
      }, 500);
    });
  },
};

export const bookingAPI = {
  createBooking: async (bookingData) => {
    // Mock create booking
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            booking: {
              id: "BK" + Date.now(),
              ...bookingData,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
          },
        });
      }, 1000);
    });
  },

  getBookings: async (filters = {}) => {
    // Mock get bookings - would use query params in real API
    // api.get('/bookings', { params: filters })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            bookings: [], // Would return filtered bookings
            total: 0,
          },
        });
      }, 500);
    });
  },

  getBookingById: async (bookingId) => {
    // Mock get booking by ID
    // api.get(`/bookings/${bookingId}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            booking: null, // Would return specific booking
          },
        });
      }, 500);
    });
  },

  updateBookingStatus: async (bookingId, status) => {
    // Mock update booking status
    // api.patch(`/bookings/${bookingId}/status`, { status })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            booking: { id: bookingId, status },
          },
        });
      }, 500);
    });
  },

  assignTruck: async (bookingId, truckId, driverId) => {
    // Mock assign truck
    // api.post(`/bookings/${bookingId}/assign`, { truckId, driverId })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            booking: { id: bookingId, truckId, driverId, status: "assigned" },
          },
        });
      }, 800);
    });
  },

  trackShipment: async (bookingId) => {
    // Mock track shipment
    // api.get(`/bookings/${bookingId}/track`)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            currentLocation: {
              lat: 40.7128,
              lng: -74.006,
            },
            status: "in-transit",
            estimatedArrival: "2-3 hours",
          },
        });
      }, 500);
    });
  },
};

export const truckAPI = {
  getTrucks: async () => {
    // Mock get trucks
    // api.get('/trucks')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            trucks: [],
          },
        });
      }, 500);
    });
  },

  addTruck: async (truckData) => {
    // Mock add truck
    // api.post('/trucks', truckData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            truck: {
              id: "T" + Date.now(),
              ...truckData,
            },
          },
        });
      }, 800);
    });
  },

  updateTruck: async (truckId, truckData) => {
    // Mock update truck
    // api.put(`/trucks/${truckId}`, truckData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            truck: { id: truckId, ...truckData },
          },
        });
      }, 500);
    });
  },
};

export const driverAPI = {
  getDrivers: async () => {
    // Mock get drivers
    // api.get('/drivers')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            drivers: [],
          },
        });
      }, 500);
    });
  },

  addDriver: async (driverData) => {
    // Mock add driver
    // api.post('/drivers', driverData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            driver: {
              id: "D" + Date.now(),
              ...driverData,
            },
          },
        });
      }, 800);
    });
  },
};

// Example of how to use in production:
/*
export const bookingAPI = {
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getBookings: async (filters) => {
    try {
      const response = await api.get('/bookings', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
*/

export default api;
