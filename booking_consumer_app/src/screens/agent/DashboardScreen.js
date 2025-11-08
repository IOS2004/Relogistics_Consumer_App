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
          <Text style={styles.subGreeting}>Welcome back, {user?.name || 'Agent'}</Text>
        </View>
        <View style={styles.notificationIcon}>
          <Icon name="bell-outline" size={24} color={colors.gray[700]} />
          <View style={styles.badge} />
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScrollContent}
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
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
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
                size={16}
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
      </View>

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
        <Icon name={icon} size={20} color={color} />
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
    paddingVertical: 12,
  },
  statsScrollContent: {
    paddingHorizontal: spacing.lg,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 110,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.gray[900],
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  filterContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: 8,
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
