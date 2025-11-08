import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useBooking } from "../../contexts/BookingContext";
import Button from "../../components/Button";
import { colors, spacing } from "../../config/theme";
import { mockTrucks, mockDrivers } from "../../data/mockData";

export default function AssignTruckScreen({ route, navigation }) {
  const { bookingId } = route.params;
  const { getBookingById, assignTruckToBooking, trucks, drivers } =
    useBooking();

  const booking = getBookingById(bookingId);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const availableTrucks = trucks.filter((t) => t.available);
  const availableDrivers = drivers.filter((d) => d.available);

  const handleAssign = () => {
    if (!selectedTruck || !selectedDriver) {
      Alert.alert(
        "Incomplete Selection",
        "Please select both truck and driver"
      );
      return;
    }

    assignTruckToBooking(bookingId, selectedTruck, selectedDriver);

    Alert.alert("Success! ✅", "Truck and driver assigned successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Booking not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Booking Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Information</Text>
        <View style={styles.bookingCard}>
          <View style={styles.bookingRow}>
            <Text style={styles.label}>Booking ID</Text>
            <Text style={styles.value}>#{booking.id}</Text>
          </View>
          <View style={styles.bookingRow}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{booking.consumerName}</Text>
          </View>
          <View style={styles.bookingRow}>
            <Text style={styles.label}>Route</Text>
            <Text style={styles.value} numberOfLines={1}>
              {booking.pickupAddress.city} → {booking.deliveryAddress.city}
            </Text>
          </View>
          <View style={styles.bookingRow}>
            <Text style={styles.label}>Truck Type</Text>
            <Text style={styles.value}>{booking.truckType}</Text>
          </View>
          <View style={styles.bookingRow}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>{booking.goodsDetails.weight} kg</Text>
          </View>
        </View>
      </View>

      {/* Select Truck */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Select Truck ({availableTrucks.length} available)
        </Text>
        {availableTrucks.length > 0 ? (
          availableTrucks.map((truck) => (
            <TouchableOpacity
              key={truck.id}
              style={[
                styles.selectCard,
                selectedTruck === truck.id && styles.selectCardActive,
              ]}
              onPress={() => setSelectedTruck(truck.id)}
            >
              <View style={styles.selectLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    selectedTruck === truck.id && styles.iconCircleActive,
                  ]}
                >
                  <Icon
                    name="truck"
                    size={24}
                    color={
                      selectedTruck === truck.id ? colors.white : colors.primary
                    }
                  />
                </View>
                <View style={styles.selectInfo}>
                  <Text style={styles.selectTitle}>{truck.number}</Text>
                  <Text style={styles.selectSubtitle}>
                    {truck.type} • {truck.capacity} kg
                  </Text>
                  <Text style={styles.selectDetail}>
                    License: {truck.licensePlate}
                  </Text>
                </View>
              </View>
              {selectedTruck === truck.id && (
                <Icon name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="truck-remove" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No trucks available</Text>
          </View>
        )}
      </View>

      {/* Select Driver */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Select Driver ({availableDrivers.length} available)
        </Text>
        {availableDrivers.length > 0 ? (
          availableDrivers.map((driver) => (
            <TouchableOpacity
              key={driver.id}
              style={[
                styles.selectCard,
                selectedDriver === driver.id && styles.selectCardActive,
              ]}
              onPress={() => setSelectedDriver(driver.id)}
            >
              <View style={styles.selectLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    selectedDriver === driver.id && styles.iconCircleActive,
                  ]}
                >
                  <Icon
                    name="account"
                    size={24}
                    color={
                      selectedDriver === driver.id
                        ? colors.white
                        : colors.primary
                    }
                  />
                </View>
                <View style={styles.selectInfo}>
                  <Text style={styles.selectTitle}>{driver.name}</Text>
                  <Text style={styles.selectSubtitle}>{driver.phone}</Text>
                  <View style={styles.driverStats}>
                    <Icon name="star" size={14} color={colors.warning} />
                    <Text style={styles.rating}>{driver.rating}</Text>
                    <Text style={styles.trips}>• {driver.trips} trips</Text>
                  </View>
                </View>
              </View>
              {selectedDriver === driver.id && (
                <Icon name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="account-off" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No drivers available</Text>
          </View>
        )}
      </View>

      {/* Assign Button */}
      <View style={styles.section}>
        <Button
          onPress={handleAssign}
          disabled={!selectedTruck || !selectedDriver}
        >
          Assign Truck & Driver
        </Button>
      </View>
    </ScrollView>
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
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  label: {
    fontSize: 14,
    color: colors.gray[600],
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  selectCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  selectCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  selectLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleActive: {
    backgroundColor: colors.primary,
  },
  selectInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  selectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[900],
  },
  selectSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  selectDetail: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  driverStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginLeft: 4,
  },
  trips: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 4,
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
