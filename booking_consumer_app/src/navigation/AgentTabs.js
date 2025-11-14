import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../config/theme";

// Agent Screens
import DashboardScreen from "../screens/agent/DashboardScreen";
import AssignTruckScreen from "../screens/agent/AssignTruckScreen";
import TruckManagementScreen from "../screens/agent/TruckManagementScreen";
import ReportsScreen from "../screens/agent/ReportsScreen";
import ProfileScreen from "../screens/agent/ProfileScreen";
import BookingDetailsScreen from "../screens/agent/BookingDetailsScreen";
import EarningsScreen from "../screens/agent/EarningsScreen";
import NotificationsScreen from "../screens/agent/NotificationsScreen";
import SupportScreen from "../screens/agent/SupportScreen";
import EnhancedReportsScreen from "../screens/agent/EnhancedReportsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssignTruck"
        component={AssignTruckScreen}
        options={{
          title: "Assign Truck",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
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
      <Stack.Screen
        name="TruckManagement"
        component={TruckManagementScreen}
        options={{
          title: "Truck Management",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="EnhancedReports"
        component={EnhancedReportsScreen}
        options={{
          title: "Analytics & Reports",
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AgentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "DashboardTab") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          } else if (route.name === "Earnings") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "bell" : "bell-outline";
          } else if (route.name === "Support") {
            iconName = focused ? "help-circle" : "help-circle-outline";
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
        name="DashboardTab"
        component={DashboardStack}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{ title: "Earnings" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Alerts" }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Support" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
