import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { formatDistanceToNow } from "date-fns";

const notificationTypes = {
  booking: { icon: "package-variant", color: colors.info },
  delivery: { icon: "truck-delivery", color: colors.success },
  system: { icon: "bell", color: colors.warning },
  offer: { icon: "tag", color: colors.error },
};

export default function ConsumerNotificationsScreen() {
  const [notifications] = useState([
    {
      id: "N001",
      type: "delivery",
      title: "Delivery Completed",
      message: "Your booking #BK001 has been successfully delivered",
      timestamp: "2025-11-08T16:30:00Z",
      read: false,
    },
    {
      id: "N002",
      type: "booking",
      title: "Booking Confirmed",
      message:
        "Your booking #BK002 has been confirmed and assigned to a driver",
      timestamp: "2025-11-08T14:00:00Z",
      read: false,
    },
    {
      id: "N003",
      type: "delivery",
      title: "Out for Delivery",
      message: "Your shipment is out for delivery. Expected arrival: 2 hours",
      timestamp: "2025-11-08T12:00:00Z",
      read: true,
    },
    {
      id: "N004",
      type: "offer",
      title: "Special Discount!",
      message: "Get 20% off on your next booking. Use code: SAVE20",
      timestamp: "2025-11-08T09:00:00Z",
      read: false,
    },
    {
      id: "N005",
      type: "system",
      title: "App Update Available",
      message: "New version 2.1.0 with improved tracking features",
      timestamp: "2025-11-07T18:00:00Z",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadText}>{unreadCount} unread</Text>
          )}
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.notificationsList}>
          {notifications.map((notification) => {
            const typeConfig = notificationTypes[notification.type];
            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.notificationUnread,
                ]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: typeConfig.color + "20" },
                  ]}
                >
                  <Icon
                    name={typeConfig.icon}
                    size={24}
                    color={typeConfig.color}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>

                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>

                  <Text style={styles.notificationTime}>
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray[900],
  },
  unreadText: {
    fontSize: 13,
    color: colors.gray[600],
    marginTop: 2,
  },
  notificationsList: {
    padding: spacing.lg,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  notificationUnread: {
    backgroundColor: colors.primary + "05",
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.gray[900],
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.gray[500],
  },
});
