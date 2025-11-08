import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/AuthContext";
import { useBooking } from "../../contexts/BookingContext";
import BookingCard from "../../components/BookingCard";
import { colors, spacing } from "../../config/theme";

const filterOptions = [
  { id: "all", label: "All", icon: "view-list" },
  { id: "pending", label: "Pending", icon: "clock-outline" },
  { id: "assigned", label: "Assigned", icon: "truck-check" },
  { id: "in-transit", label: "In Transit", icon: "truck-fast" },
];

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredBookings =
    selectedFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === selectedFilter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    active: bookings.filter(
      (b) => b.status === "assigned" || b.status === "in-transit"
    ).length,
    completed: bookings.filter((b) => b.status === "delivered").length,
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Dashboard</Text>
          <Text style={styles.subGreeting}>Welcome back, {user.name}</Text>
        </View>
        <View style={styles.notificationIcon}>
          <Icon name="bell-outline" size={24} color={colors.gray[700]} />
          <View style={styles.badge} />
        </View>
      </View>

      {/* Stats Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
      >
        <StatCard
          title="Total Bookings"
          value={stats.total}
          icon="package-variant"
          color={colors.primary}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon="clock-outline"
          color={colors.warning}
        />
        <StatCard
          title="Active"
          value={stats.active}
          icon="truck-fast"
          color={colors.info}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon="check-circle"
          color={colors.success}
        />
      </ScrollView>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Icon
              name={filter.icon}
              size={18}
              color={
                selectedFilter === filter.id ? colors.white : colors.gray[600]
              }
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bookings List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={() =>
                booking.status === "pending"
                  ? navigation.navigate("AssignTruck", {
                      bookingId: booking.id,
                    })
                  : navigation.navigate("BookingDetails", {
                      bookingId: booking.id,
                    })
              }
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon
              name="package-variant-closed"
              size={48}
              color={colors.gray[300]}
            />
            <Text style={styles.emptyText}>
              No {selectedFilter !== "all" && selectedFilter} bookings found
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray[900],
  },
  subGreeting: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
  },
  notificationIcon: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginRight: spacing.md,
    minWidth: 140,
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
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray[900],
  },
  statTitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    flex: 1,
    padding: spacing.lg,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[500],
    marginTop: spacing.md,
  },
});
