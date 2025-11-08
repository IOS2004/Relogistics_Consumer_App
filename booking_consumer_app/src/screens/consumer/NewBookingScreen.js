import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/AuthContext";
import { useBooking } from "../../contexts/BookingContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { colors, spacing } from "../../config/theme";
import { truckTypes } from "../../data/mockData";

export default function NewBookingScreen({ navigation }) {
  const { user } = useAuth();
  const { createBooking } = useBooking();

  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [fragile, setFragile] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [priceEstimate, setPriceEstimate] = useState(null);

  const calculatePrice = () => {
    if (!selectedTruck || !weight) {
      Alert.alert("Missing Info", "Please select truck type and enter weight");
      return;
    }

    const truck = truckTypes.find((t) => t.id === selectedTruck);
    const weightNum = parseFloat(weight);
    const estimate = truck.basePrice + weightNum * 0.5;
    setPriceEstimate(Math.round(estimate));
  };

  const handleConfirmBooking = () => {
    if (
      !pickupAddress ||
      !pickupCity ||
      !deliveryAddress ||
      !deliveryCity ||
      !selectedTruck ||
      !weight ||
      !quantity ||
      !pickupDate ||
      !pickupTime
    ) {
      Alert.alert("Incomplete Form", "Please fill in all required fields");
      return;
    }

    if (!priceEstimate) {
      Alert.alert("Get Estimate", "Please get price estimate first");
      return;
    }

    const newBooking = createBooking({
      consumerId: user.id,
      consumerName: user.name,
      pickupAddress: {
        street: pickupAddress,
        city: pickupCity,
        state: "XX",
        zip: "00000",
        lat: 40.7128,
        lng: -74.006,
      },
      deliveryAddress: {
        street: deliveryAddress,
        city: deliveryCity,
        state: "XX",
        zip: "00000",
        lat: 42.3601,
        lng: -71.0589,
      },
      truckType: truckTypes.find((t) => t.id === selectedTruck).name,
      goodsDetails: {
        weight: parseFloat(weight),
        quantity: parseInt(quantity),
        fragile,
        description,
      },
      pickupDate,
      pickupTime,
      priceEstimate,
    });

    Alert.alert(
      "Booking Confirmed! 🎉",
      `Your booking #${newBooking.id} has been created successfully.`,
      [
        {
          text: "View Details",
          onPress: () => {
            navigation.navigate("BookingsTab", {
              screen: "BookingDetails",
              params: { bookingId: newBooking.id },
            });
          },
        },
        { text: "OK", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Pickup Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="map-marker" size={20} color={colors.success} /> Pickup
          Location
        </Text>
        <Input
          label="Street Address"
          placeholder="Enter pickup address"
          value={pickupAddress}
          onChangeText={setPickupAddress}
          icon="home"
        />
        <Input
          label="City"
          placeholder="Enter city"
          value={pickupCity}
          onChangeText={setPickupCity}
          icon="city"
        />
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="map-marker-check" size={20} color={colors.error} />{" "}
          Delivery Location
        </Text>
        <Input
          label="Street Address"
          placeholder="Enter delivery address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          icon="home"
        />
        <Input
          label="City"
          placeholder="Enter city"
          value={deliveryCity}
          onChangeText={setDeliveryCity}
          icon="city"
        />
      </View>

      {/* Truck Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Truck Type</Text>
        <View style={styles.truckGrid}>
          {truckTypes.map((truck) => (
            <TouchableOpacity
              key={truck.id}
              style={[
                styles.truckCard,
                selectedTruck === truck.id && styles.truckCardSelected,
              ]}
              onPress={() => setSelectedTruck(truck.id)}
            >
              <Icon
                name={truck.icon}
                size={32}
                color={
                  selectedTruck === truck.id ? colors.primary : colors.gray[600]
                }
              />
              <Text style={styles.truckName}>{truck.name}</Text>
              <Text style={styles.truckCapacity}>{truck.capacity} kg</Text>
              <Text style={styles.truckPrice}>${truck.basePrice}+</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Goods Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goods Details</Text>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Input
              label="Weight (kg)"
              placeholder="0"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              icon="weight-kilogram"
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Input
              label="Quantity"
              placeholder="0"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              icon="package-variant"
            />
          </View>
        </View>
        <Input
          label="Description"
          placeholder="What are you shipping?"
          value={description}
          onChangeText={setDescription}
          icon="text"
        />
        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Icon name="alert" size={20} color={colors.warning} />
            <Text style={styles.switchText}>Fragile Items</Text>
          </View>
          <Switch
            value={fragile}
            onValueChange={setFragile}
            color={colors.primary}
          />
        </View>
      </View>

      {/* Pickup Date & Time */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Schedule</Text>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Input
              label="Date"
              placeholder="YYYY-MM-DD"
              value={pickupDate}
              onChangeText={setPickupDate}
              icon="calendar"
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Input
              label="Time"
              placeholder="HH:MM AM/PM"
              value={pickupTime}
              onChangeText={setPickupTime}
              icon="clock"
            />
          </View>
        </View>
      </View>

      {/* Price Estimate */}
      <View style={styles.section}>
        {priceEstimate ? (
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Estimated Price</Text>
            <Text style={styles.priceValue}>${priceEstimate}</Text>
            <Text style={styles.priceNote}>*Final price may vary</Text>
          </View>
        ) : (
          <Button variant="outline" onPress={calculatePrice}>
            Get Price Estimate
          </Button>
        )}
      </View>

      {/* Confirm Button */}
      <View style={styles.section}>
        <Button onPress={handleConfirmBooking}>Confirm Booking</Button>
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
  row: {
    flexDirection: "row",
  },
  truckGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  truckCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  truckCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  truckName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginTop: spacing.sm,
  },
  truckCapacity: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  truckPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginTop: spacing.xs,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
  },
  switchLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.gray[900],
    fontWeight: "500",
  },
  priceCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  priceValue: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.white,
    marginTop: spacing.xs,
  },
  priceNote: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
});
