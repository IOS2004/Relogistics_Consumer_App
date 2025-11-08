import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../config/theme";
import { statusColors, statusLabels } from "../data/mockData";
import { format } from "date-fns";

export default function BookingCard({ booking, onPress }) {
  const statusColor = statusColors[booking.status] || colors.gray[400];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View>
          <Text style={styles.bookingId}>#{booking.id}</Text>
          <Text style={styles.date}>
            {format(new Date(booking.createdAt), "MMM dd, yyyy")}
          </Text>
        </View>
        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabels[booking.status]}
          </Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Icon name="map-marker" size={20} color={colors.success} />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.address} numberOfLines={1}>
              {booking.pickupAddress.city}, {booking.pickupAddress.state}
            </Text>
          </View>
        </View>

        <View style={styles.divider}>
          <Icon name="dots-vertical" size={20} color={colors.gray[300]} />
        </View>

        <View style={styles.locationRow}>
          <Icon name="map-marker-check" size={20} color={colors.error} />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Delivery</Text>
            <Text style={styles.address} numberOfLines={1}>
              {booking.deliveryAddress.city}, {booking.deliveryAddress.state}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.detailRow}>
          <Icon name="truck" size={18} color={colors.gray[600]} />
          <Text style={styles.detailText}>{booking.truckType}</Text>
        </View>
        <Text style={styles.price}>${booking.priceEstimate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[900],
  },
  date: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  locationContainer: {
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.gray[500],
  },
  address: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: "500",
    marginTop: 2,
  },
  divider: {
    marginLeft: 10,
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: spacing.xs,
    fontSize: 14,
    color: colors.gray[600],
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
});
