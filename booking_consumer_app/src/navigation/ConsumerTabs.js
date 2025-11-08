import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../config/theme";

// Consumer Screens
import HomeScreen from "../screens/consumer/HomeScreen";
import NewBookingScreen from "../screens/consumer/NewBookingScreen";
import MyBookingsScreen from "../screens/consumer/MyBookingsScreen";
import BookingDetailsScreen from "../screens/consumer/BookingDetailsScreen";
import TrackShipmentScreen from "../screens/consumer/TrackShipmentScreen";
import NearbyTrucksScreen from "../screens/consumer/NearbyTrucksScreen";
import ProfileScreen from "../screens/consumer/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewBooking"
        component={NewBookingScreen}
        options={{
          title: "New Booking",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="TrackShipment"
        component={TrackShipmentScreen}
        options={{
          title: "Track Shipment",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="NearbyTrucks"
        component={NearbyTrucksScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BookingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{
          title: "Booking Details",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}

export default function ConsumerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "BookingsTab") {
            iconName = focused ? "package-variant" : "package-variant-closed";
          } else if (route.name === "Track") {
            iconName = focused ? "map-marker" : "map-marker-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsStack}
        options={{ title: "Bookings" }}
      />
      <Tab.Screen
        name="Track"
        component={TrackShipmentScreen}
        options={{
          title: "Track",
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
    </Tab.Navigator>
  );
}
