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
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: colors.gray[500],
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  locationContainer: {
    marginVertical: spacing.sm,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  locationText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 1,
  },
  address: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: "600",
  },
  divider: {
    marginLeft: 10,
    marginVertical: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: spacing.xs,
    fontSize: 13,
    color: colors.gray[600],
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
});
