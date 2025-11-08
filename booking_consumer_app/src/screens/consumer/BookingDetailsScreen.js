import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useBooking } from "../../contexts/BookingContext";
import { colors, spacing } from "../../config/theme";
import { statusColors, statusLabels, mockDrivers } from "../../data/mockData";
import { format } from "date-fns";

export default function BookingDetailsScreen({ route }) {
  const { bookingId } = route.params;
  const { getBookingById } = useBooking();

  const booking = getBookingById(bookingId);

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Booking not found</Text>
      </View>
    );
  }

  const driver = mockDrivers.find((d) => d.id === booking.driverId);
  const statusColor = statusColors[booking.status] || colors.gray[400];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Status Header */}
      <View style={[styles.statusHeader, { backgroundColor: statusColor }]}>
        <Icon name="truck-delivery" size={48} color={colors.white} />
        <Text style={styles.statusText}>{statusLabels[booking.status]}</Text>
        <Text style={styles.bookingId}>#{booking.id}</Text>
      </View>

      {/* Progress Tracker */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shipment Progress</Text>
        <View style={styles.progressContainer}>
          <ProgressStep
            icon="package-variant"
            label="Pending"
            active={true}
            completed={booking.status !== "pending"}
          />
          <ProgressLine completed={booking.status !== "pending"} />
          <ProgressStep
            icon="truck"
            label="Assigned"
            active={
              booking.status === "assigned" ||
              booking.status === "in-transit" ||
              booking.status === "delivered"
            }
            completed={
              booking.status === "in-transit" || booking.status === "delivered"
            }
          />
          <ProgressLine
            completed={
              booking.status === "in-transit" || booking.status === "delivered"
            }
          />
          <ProgressStep
            icon="truck-fast"
            label="In Transit"
            active={
              booking.status === "in-transit" || booking.status === "delivered"
            }
            completed={booking.status === "delivered"}
          />
          <ProgressLine completed={booking.status === "delivered"} />
          <ProgressStep
            icon="check-circle"
            label="Delivered"
            active={booking.status === "delivered"}
            completed={booking.status === "delivered"}
          />
        </View>
      </View>

      {/* Route Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Route Information</Text>
        <View style={styles.routeItem}>
          <Icon name="map-marker" size={24} color={colors.success} />
          <View style={styles.routeInfo}>
            <Text style={styles.routeLabel}>Pickup Location</Text>
            <Text style={styles.routeAddress}>
              {booking.pickupAddress.street}
            </Text>
            <Text style={styles.routeCity}>
              {booking.pickupAddress.city}, {booking.pickupAddress.state}
            </Text>
          </View>
        </View>
        <View style={styles.routeDivider} />
        <View style={styles.routeItem}>
          <Icon name="map-marker-check" size={24} color={colors.error} />
          <View style={styles.routeInfo}>
            <Text style={styles.routeLabel}>Delivery Location</Text>
            <Text style={styles.routeAddress}>
              {booking.deliveryAddress.street}
            </Text>
            <Text style={styles.routeCity}>
              {booking.deliveryAddress.city}, {booking.deliveryAddress.state}
            </Text>
          </View>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Booking Details</Text>
        <DetailRow icon="truck" label="Truck Type" value={booking.truckType} />
        <DetailRow
          icon="weight-kilogram"
          label="Weight"
          value={`${booking.goodsDetails.weight} kg`}
        />
        <DetailRow
          icon="package-variant"
          label="Quantity"
          value={booking.goodsDetails.quantity}
        />
        <DetailRow
          icon="calendar"
          label="Pickup Date"
          value={booking.pickupDate}
        />
        <DetailRow
          icon="clock"
          label="Pickup Time"
          value={booking.pickupTime}
        />
        {booking.goodsDetails.description && (
          <DetailRow
            icon="text"
            label="Description"
            value={booking.goodsDetails.description}
          />
        )}
        {booking.goodsDetails.fragile && (
          <DetailRow
            icon="alert"
            label="Special Note"
            value="Fragile Items"
            valueColor={colors.warning}
          />
        )}
      </View>

      {/* Driver Info */}
      {driver && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Information</Text>
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Icon name="account" size={32} color={colors.white} />
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverPhone}>{driver.phone}</Text>
              <View style={styles.driverRating}>
                <Icon name="star" size={16} color={colors.warning} />
                <Text style={styles.ratingText}>{driver.rating}</Text>
                <Text style={styles.tripsText}>• {driver.trips} trips</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Price */}
      <View style={styles.card}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>${booking.priceEstimate}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ProgressStep({ icon, label, active, completed }) {
  return (
    <View style={styles.progressStep}>
      <View
        style={[
          styles.progressCircle,
          active && styles.progressCircleActive,
          completed && styles.progressCircleCompleted,
        ]}
      >
        <Icon
          name={icon}
          size={20}
          color={active || completed ? colors.white : colors.gray[400]}
        />
      </View>
      <Text
        style={[
          styles.progressLabel,
          (active || completed) && styles.progressLabelActive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function ProgressLine({ completed }) {
  return (
    <View
      style={[styles.progressLine, completed && styles.progressLineCompleted]}
    />
  );
}

function DetailRow({ icon, label, value, valueColor }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailLeft}>
        <Icon name={icon} size={20} color={colors.gray[400]} />
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <Text style={[styles.detailValue, valueColor && { color: valueColor }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  statusHeader: {
    padding: spacing.xl,
    alignItems: "center",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginTop: spacing.md,
  },
  bookingId: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircleActive: {
    backgroundColor: colors.primary,
  },
  progressCircleCompleted: {
    backgroundColor: colors.success,
  },
  progressLabel: {
    fontSize: 10,
    color: colors.gray[500],
    marginTop: spacing.xs,
    textAlign: "center",
  },
  progressLabelActive: {
    color: colors.gray[900],
    fontWeight: "600",
  },
  progressLine: {
    height: 2,
    backgroundColor: colors.gray[200],
    flex: 1,
  },
  progressLineCompleted: {
    backgroundColor: colors.success,
  },
  routeItem: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  routeInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[900],
  },
  routeCity: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  routeDivider: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.gray[600],
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  driverInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[900],
  },
  driverPhone: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginLeft: 4,
  },
  tripsText: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    color: colors.gray[600],
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
});
