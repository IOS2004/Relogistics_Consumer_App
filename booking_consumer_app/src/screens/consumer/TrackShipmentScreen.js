import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { colors, spacing } from "../../config/theme";
import { useBooking } from "../../contexts/BookingContext";
import { statusColors, statusLabels } from "../../data/mockData";

const { width, height } = Dimensions.get("window");

export default function TrackShipmentScreen() {
  const [trackingId, setTrackingId] = useState("");
  const [trackedBooking, setTrackedBooking] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { getBookingById } = useBooking();

  // Simulate truck movement
  useEffect(() => {
    if (trackedBooking && trackedBooking.status === "in-transit") {
      const interval = setInterval(() => {
        setCurrentLocation((prev) => {
          if (!prev) return trackedBooking.pickupAddress;

          // Simulate movement towards delivery
          const pickup = trackedBooking.pickupAddress;
          const delivery = trackedBooking.deliveryAddress;
          const progress = Math.random() * 0.1; // Random progress

          return {
            lat: prev.lat + (delivery.lat - pickup.lat) * progress,
            lng: prev.lng + (delivery.lng - pickup.lng) * progress,
          };
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [trackedBooking]);

  const handleTrack = () => {
    const booking = getBookingById(trackingId);
    if (booking) {
      setTrackedBooking(booking);
      setCurrentLocation(
        booking.status === "delivered"
          ? booking.deliveryAddress
          : booking.pickupAddress
      );
    } else {
      alert("Booking not found. Please check the tracking ID.");
      setTrackedBooking(null);
      setCurrentLocation(null);
    }
  };

  const statusColor = trackedBooking
    ? statusColors[trackedBooking.status] || colors.gray[400]
    : colors.gray[400];

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Enter Tracking ID (e.g., BK001)"
          value={trackingId}
          onChangeText={setTrackingId}
          icon="magnify"
        />
        <Button onPress={handleTrack} style={styles.trackButton}>
          Track Shipment
        </Button>
      </View>

      {/* Map View */}
      {trackedBooking && currentLocation ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: trackedBooking.pickupAddress.lat,
              longitude: trackedBooking.pickupAddress.lng,
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
          >
            {/* Pickup Marker */}
            <Marker
              coordinate={{
                latitude: trackedBooking.pickupAddress.lat,
                longitude: trackedBooking.pickupAddress.lng,
              }}
              title="Pickup Location"
              description={trackedBooking.pickupAddress.city}
            >
              <Icon name="map-marker" size={40} color={colors.success} />
            </Marker>

            {/* Current Truck Location */}
            {trackedBooking.status === "in-transit" && (
              <Marker
                coordinate={{
                  latitude: currentLocation.lat,
                  longitude: currentLocation.lng,
                }}
                title="Truck Location"
                description="Current Position"
              >
                <Icon name="truck-fast" size={40} color={colors.primary} />
              </Marker>
            )}

            {/* Delivery Marker */}
            <Marker
              coordinate={{
                latitude: trackedBooking.deliveryAddress.lat,
                longitude: trackedBooking.deliveryAddress.lng,
              }}
              title="Delivery Location"
              description={trackedBooking.deliveryAddress.city}
            >
              <Icon name="map-marker-check" size={40} color={colors.error} />
            </Marker>

            {/* Route Line */}
            <Polyline
              coordinates={[
                {
                  latitude: trackedBooking.pickupAddress.lat,
                  longitude: trackedBooking.pickupAddress.lng,
                },
                {
                  latitude: trackedBooking.deliveryAddress.lat,
                  longitude: trackedBooking.deliveryAddress.lng,
                },
              ]}
              strokeColor={colors.primary}
              strokeWidth={3}
              lineDashPattern={[10, 5]}
            />
          </MapView>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View
                style={[styles.statusBadge, { backgroundColor: statusColor }]}
              >
                <Text style={styles.statusText}>
                  {statusLabels[trackedBooking.status]}
                </Text>
              </View>
              <Text style={styles.trackingId}>#{trackedBooking.id}</Text>
            </View>

            <View style={styles.locationInfo}>
              <View style={styles.locationRow}>
                <Icon name="map-marker" size={20} color={colors.success} />
                <View style={styles.locationText}>
                  <Text style={styles.locationLabel}>From</Text>
                  <Text style={styles.locationValue}>
                    {trackedBooking.pickupAddress.city}
                  </Text>
                </View>
              </View>

              <Icon name="arrow-right" size={20} color={colors.gray[400]} />

              <View style={styles.locationRow}>
                <Icon name="map-marker-check" size={20} color={colors.error} />
                <View style={styles.locationText}>
                  <Text style={styles.locationLabel}>To</Text>
                  <Text style={styles.locationValue}>
                    {trackedBooking.deliveryAddress.city}
                  </Text>
                </View>
              </View>
            </View>

            {trackedBooking.status === "in-transit" && (
              <View style={styles.estimateContainer}>
                <Icon name="clock-outline" size={16} color={colors.gray[600]} />
                <Text style={styles.estimateText}>
                  Estimated arrival: 2-3 hours
                </Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="map-search" size={80} color={colors.gray[300]} />
          <Text style={styles.emptyText}>
            Enter a tracking ID to get started
          </Text>
          <Text style={styles.emptySubtext}>
            You can find the tracking ID in your booking details
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  searchContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  trackButton: {
    marginTop: spacing.sm,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  statusCard: {
    position: "absolute",
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  trackingId: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
  },
  locationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationText: {
    marginLeft: spacing.xs,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.gray[500],
  },
  locationValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  estimateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  estimateText: {
    marginLeft: spacing.xs,
    fontSize: 14,
    color: colors.gray[600],
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[700],
    marginTop: spacing.lg,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
