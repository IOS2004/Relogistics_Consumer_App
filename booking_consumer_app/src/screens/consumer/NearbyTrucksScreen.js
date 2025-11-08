import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { nearbyTrucks } from "../../data/mockData";

const { width, height } = Dimensions.get("window");

export default function NearbyTrucksScreen({ navigation }) {
  const [selectedTruck, setSelectedTruck] = useState(null);

  // User's current location (mock - in production use expo-location)
  const userLocation = {
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.title}>Nearby Trucks</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation
        showsMyLocationButton
      >
        {/* User Location Marker */}
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Your Location"
        >
          <View style={styles.userMarker}>
            <Icon name="account" size={20} color={colors.white} />
          </View>
        </Marker>

        {/* Nearby Trucks Markers */}
        {nearbyTrucks.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: truck.location.lat,
              longitude: truck.location.lng,
            }}
            onPress={() => setSelectedTruck(truck)}
          >
            <View style={styles.truckMarker}>
              <Icon name="truck" size={20} color={colors.white} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Icon name="information" size={20} color={colors.info} />
        <Text style={styles.infoText}>
          {nearbyTrucks.length} trucks available near you
        </Text>
      </View>

      {/* Selected Truck Details */}
      {selectedTruck && (
        <View style={styles.truckDetails}>
          <View style={styles.detailsHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.truckNumber}>{selectedTruck.number}</Text>
              <Text style={styles.truckType}>{selectedTruck.type}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedTruck(null)}>
              <Icon name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContent}>
            <View style={styles.detailRow}>
              <Icon name="account-circle" size={18} color={colors.gray[600]} />
              <Text style={styles.detailText}>{selectedTruck.driverName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="star" size={18} color={colors.warning} />
              <Text style={styles.detailText}>
                {selectedTruck.rating} rating
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="weight" size={18} color={colors.gray[600]} />
              <Text style={styles.detailText}>
                {selectedTruck.capacity} kg capacity
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={18} color={colors.gray[600]} />
              <Text style={styles.detailText}>ETA: {selectedTruck.eta}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="card-text" size={18} color={colors.gray[600]} />
              <Text style={styles.detailText}>
                {selectedTruck.licensePlate}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              navigation.navigate("NewBooking", {
                selectedTruckType: selectedTruck.type,
              });
            }}
          >
            <Text style={styles.bookButtonText}>Book This Truck</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Truck Type Filter */}
      {!selectedTruck && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filter by Type</Text>
          <View style={styles.filterChips}>
            <TouchableOpacity
              style={[styles.filterChip, styles.filterChipActive]}
            >
              <Text
                style={[styles.filterChipText, styles.filterChipTextActive]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Large</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray[900],
  },
  map: {
    width: width,
    height: height - 200,
  },
  userMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.white,
  },
  truckMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  infoBanner: {
    position: "absolute",
    top: 80,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.gray[700],
    fontWeight: "600",
  },
  truckDetails: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  truckNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray[900],
  },
  truckType: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  detailsContent: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  detailText: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.gray[700],
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: "center",
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  filterContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  filterChips: {
    flexDirection: "row",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
  },
  filterChipTextActive: {
    color: colors.white,
  },
});
