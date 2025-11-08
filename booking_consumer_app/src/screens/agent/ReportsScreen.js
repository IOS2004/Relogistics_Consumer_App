import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useBooking } from "../../contexts/BookingContext";
import { colors, spacing } from "../../config/theme";

export default function ReportsScreen() {
  const { bookings } = useBooking();

  const stats = {
    totalDeliveries: bookings.filter((b) => b.status === "delivered").length,
    inProgress: bookings.filter(
      (b) => b.status === "in-transit" || b.status === "assigned"
    ).length,
    pending: bookings.filter((b) => b.status === "pending").length,
    totalRevenue: bookings
      .filter((b) => b.status === "delivered")
      .reduce((sum, b) => sum + b.priceEstimate, 0),
    avgRevenue:
      bookings.filter((b) => b.status === "delivered").length > 0
        ? Math.round(
            bookings
              .filter((b) => b.status === "delivered")
              .reduce((sum, b) => sum + b.priceEstimate, 0) /
              bookings.filter((b) => b.status === "delivered").length
          )
        : 0,
  };

  const recentCompletedBookings = bookings
    .filter((b) => b.status === "delivered")
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overview Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="check-circle"
              label="Completed"
              value={stats.totalDeliveries}
              color={colors.success}
            />
            <StatCard
              icon="truck-fast"
              label="In Progress"
              value={stats.inProgress}
              color={colors.info}
            />
            <StatCard
              icon="clock-outline"
              label="Pending"
              value={stats.pending}
              color={colors.warning}
            />
            <StatCard
              icon="package-variant"
              label="Total Bookings"
              value={bookings.length}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Revenue Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue</Text>
          <View style={styles.revenueCard}>
            <View style={styles.revenueItem}>
              <Icon name="currency-usd" size={32} color={colors.success} />
              <View style={styles.revenueInfo}>
                <Text style={styles.revenueLabel}>Total Revenue</Text>
                <Text style={styles.revenueValue}>${stats.totalRevenue}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.revenueItem}>
              <Icon name="chart-line" size={32} color={colors.primary} />
              <View style={styles.revenueInfo}>
                <Text style={styles.revenueLabel}>Average per Delivery</Text>
                <Text style={styles.revenueValue}>${stats.avgRevenue}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Completed Deliveries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Completed Deliveries</Text>
          {recentCompletedBookings.length > 0 ? (
            recentCompletedBookings.map((booking) => (
              <View key={booking.id} style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <Text style={styles.deliveryId}>#{booking.id}</Text>
                  <Text style={styles.deliveryPrice}>
                    ${booking.priceEstimate}
                  </Text>
                </View>
                <View style={styles.deliveryRoute}>
                  <Icon name="map-marker" size={16} color={colors.success} />
                  <Text style={styles.routeText}>
                    {booking.pickupAddress.city}
                  </Text>
                  <Icon name="arrow-right" size={16} color={colors.gray[400]} />
                  <Icon
                    name="map-marker-check"
                    size={16}
                    color={colors.error}
                  />
                  <Text style={styles.routeText}>
                    {booking.deliveryAddress.city}
                  </Text>
                </View>
                <View style={styles.deliveryInfo}>
                  <View style={styles.infoItem}>
                    <Icon name="truck" size={14} color={colors.gray[500]} />
                    <Text style={styles.infoText}>{booking.truckType}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Icon
                      name="weight-kilogram"
                      size={14}
                      color={colors.gray[500]}
                    />
                    <Text style={styles.infoText}>
                      {booking.goodsDetails.weight} kg
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon
                name="package-variant-closed"
                size={48}
                color={colors.gray[300]}
              />
              <Text style={styles.emptyText}>No completed deliveries yet</Text>
            </View>
          )}
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.metricsCard}>
            <MetricRow
              icon="percent"
              label="Completion Rate"
              value={
                bookings.length > 0
                  ? `${Math.round(
                      (stats.totalDeliveries / bookings.length) * 100
                    )}%`
                  : "0%"
              }
              color={colors.success}
            />
            <MetricRow
              icon="clock-check"
              label="On-Time Deliveries"
              value="95%"
              color={colors.primary}
            />
            <MetricRow
              icon="star"
              label="Customer Satisfaction"
              value="4.8/5"
              color={colors.warning}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MetricRow({ icon, label, value, color }) {
  return (
    <View style={styles.metricRow}>
      <View style={styles.metricLeft}>
        <Icon name={icon} size={20} color={color} />
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  revenueCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
  },
  revenueItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  revenueInfo: {
    marginLeft: spacing.md,
  },
  revenueLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  revenueValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray[900],
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginVertical: spacing.md,
  },
  deliveryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  deliveryId: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  deliveryPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  deliveryRoute: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  routeText: {
    fontSize: 14,
    color: colors.gray[700],
    marginHorizontal: spacing.xs,
  },
  deliveryInfo: {
    flexDirection: "row",
    gap: spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  metricsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricLabel: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.gray[700],
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: spacing.sm,
  },
});
