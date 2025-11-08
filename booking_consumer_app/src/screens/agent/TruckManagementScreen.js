import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useBooking } from "../../contexts/BookingContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { colors, spacing } from "../../config/theme";

export default function TruckManagementScreen() {
  const { trucks, drivers, addTruck } = useBooking();
  const [showAddTruck, setShowAddTruck] = useState(false);
  const [truckNumber, setTruckNumber] = useState("");
  const [truckType, setTruckType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleAddTruck = () => {
    if (!truckNumber || !truckType || !capacity || !licensePlate) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    addTruck({
      number: truckNumber,
      type: truckType,
      capacity: parseInt(capacity),
      licensePlate,
      available: true,
    });

    Alert.alert("Success", "Truck added successfully");
    setShowAddTruck(false);
    setTruckNumber("");
    setTruckType("");
    setCapacity("");
    setLicensePlate("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trucks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trucks ({trucks.length})</Text>
            <TouchableOpacity onPress={() => setShowAddTruck(!showAddTruck)}>
              <Icon
                name={showAddTruck ? "close" : "plus-circle"}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Add Truck Form */}
          {showAddTruck && (
            <View style={styles.addForm}>
              <Input
                label="Truck Number"
                placeholder="TRK-1005"
                value={truckNumber}
                onChangeText={setTruckNumber}
                icon="truck"
              />
              <Input
                label="Type"
                placeholder="Small/Medium/Large Truck"
                value={truckType}
                onChangeText={setTruckType}
                icon="format-list-bulleted-type"
              />
              <Input
                label="Capacity (kg)"
                placeholder="1000"
                value={capacity}
                onChangeText={setCapacity}
                keyboardType="numeric"
                icon="weight-kilogram"
              />
              <Input
                label="License Plate"
                placeholder="XX-1234"
                value={licensePlate}
                onChangeText={setLicensePlate}
                icon="card-account-details"
              />
              <Button onPress={handleAddTruck}>Add Truck</Button>
            </View>
          )}

          {/* Trucks List */}
          {trucks.map((truck) => (
            <View key={truck.id} style={styles.itemCard}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: truck.available
                      ? colors.success
                      : colors.error,
                  },
                ]}
              />
              <View style={styles.iconContainer}>
                <Icon name="truck" size={32} color={colors.primary} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{truck.number}</Text>
                <Text style={styles.itemSubtitle}>
                  {truck.type} • {truck.capacity} kg
                </Text>
                <Text style={styles.itemDetail}>
                  License: {truck.licensePlate}
                </Text>
                <View style={styles.statusBadge}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: truck.available ? colors.success : colors.error,
                      },
                    ]}
                  >
                    {truck.available ? "Available" : "In Use"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="pencil" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Drivers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Drivers ({drivers.length})</Text>
            <TouchableOpacity>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {drivers.map((driver) => (
            <View key={driver.id} style={styles.itemCard}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: driver.available
                      ? colors.success
                      : colors.error,
                  },
                ]}
              />
              <View style={styles.iconContainer}>
                <Icon name="account" size={32} color={colors.primary} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{driver.name}</Text>
                <Text style={styles.itemSubtitle}>{driver.phone}</Text>
                <View style={styles.driverStats}>
                  <Icon name="star" size={14} color={colors.warning} />
                  <Text style={styles.rating}>{driver.rating}</Text>
                  <Text style={styles.trips}> • {driver.trips} trips</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: driver.available ? colors.success : colors.error,
                      },
                    ]}
                  >
                    {driver.available ? "Available" : "On Duty"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="pencil" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
          ))}
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
  addForm: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    position: "relative",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.sm,
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[900],
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  itemDetail: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  statusBadge: {
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
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
  },
});
