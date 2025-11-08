import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/AuthContext";
import { useBooking } from "../../contexts/BookingContext";
import QuickActionCard from "../../components/QuickActionCard";
import BookingCard from "../../components/BookingCard";
import { colors, spacing } from "../../config/theme";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { bookings } = useBooking();

  // Get user's recent bookings
  const userBookings = bookings
    .filter((b) => b.consumerId === user?.id)
    .slice(0, 3);

  const activeBooking = userBookings.find(
    (b) => b.status === "in-transit" || b.status === "assigned"
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {user?.name || "Guest"}! 👋
          </Text>
          <Text style={styles.subGreeting}>
            Where do you want to ship today?
          </Text>
        </View>
        <View style={styles.notificationIcon}>
          <Icon name="bell-outline" size={24} color={colors.gray[700]} />
          <View style={styles.badge} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <QuickActionCard
              icon="package-variant"
              title="New Booking"
              onPress={() => navigation.navigate("NewBooking")}
              color={colors.primary}
            />
            <QuickActionCard
              icon="map-marker-path"
              title="Track"
              onPress={() => navigation.navigate("TrackShipment")}
              color={colors.success}
            />
          </View>
          <View style={styles.actionsContainer}>
            <QuickActionCard
              icon="truck-delivery"
              title="Nearby Trucks"
              onPress={() => navigation.navigate("NearbyTrucks")}
              color={colors.info}
            />
            <QuickActionCard
              icon="history"
              title="My Bookings"
              onPress={() => navigation.navigate("BookingsTab")}
              color={colors.warning}
            />
          </View>
        </View>

        {/* Active Shipment */}
        {activeBooking && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Shipment</Text>
            <BookingCard
              booking={activeBooking}
              onPress={() =>
                navigation.navigate("BookingsTab", {
                  screen: "BookingDetails",
                  params: { bookingId: activeBooking.id },
                })
              }
            />
          </View>
        )}

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <Text
              style={styles.viewAll}
              onPress={() => navigation.navigate("BookingsTab")}
            >
              View All
            </Text>
          </View>
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() =>
                  navigation.navigate("BookingsTab", {
                    screen: "BookingDetails",
                    params: { bookingId: booking.id },
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
              <Text style={styles.emptyText}>No bookings yet</Text>
              <Text style={styles.emptySubtext}>
                Create your first booking to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[900],
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[700],
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
});
