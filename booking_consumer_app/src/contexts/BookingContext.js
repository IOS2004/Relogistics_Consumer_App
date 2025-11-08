import React, { createContext, useState, useContext } from "react";
import { mockBookings, mockTrucks, mockDrivers } from "../data/mockData";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(mockBookings);
  const [trucks, setTrucks] = useState(mockTrucks);
  const [drivers, setDrivers] = useState(mockDrivers);
  const [trackingData, setTrackingData] = useState({});

  const createBooking = (bookingData) => {
    const newBooking = {
      id: "BK" + Date.now(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const assignTruckToBooking = (bookingId, truckId, driverId) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, truckId, driverId, status: "assigned" }
          : booking
      )
    );
  };

  const getBookingById = (id) => {
    return bookings.find((booking) => booking.id === id);
  };

  const getConsumerBookings = (consumerId) => {
    return bookings.filter((booking) => booking.consumerId === consumerId);
  };

  const updateTrackingData = (bookingId, location) => {
    setTrackingData({
      ...trackingData,
      [bookingId]: {
        currentLocation: location,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const addTruck = (truckData) => {
    const newTruck = {
      id: "T" + Date.now(),
      ...truckData,
    };
    setTrucks([...trucks, newTruck]);
    return newTruck;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        trucks,
        drivers,
        trackingData,
        createBooking,
        updateBookingStatus,
        assignTruckToBooking,
        getBookingById,
        getConsumerBookings,
        updateTrackingData,
        addTruck,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
