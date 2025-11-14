import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { formatDistanceToNow } from "date-fns";

const notificationTypes = {
  booking: { icon: "package-variant", color: colors.info },
  payment: { icon: "currency-inr", color: colors.success },
  system: { icon: "bell", color: colors.warning },
  alert: { icon: "alert-circle", color: colors.error },
};

const filterOptions = [
  { id: "all", label: "All" },
  { id: "booking", label: "Bookings" },
  { id: "payment", label: "Payments" },
  { id: "system", label: "System" },
];

export default function NotificationsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: "N001",
      type: "booking",
      title: "New Booking Assigned",
      message: "Booking #BK157 has been assigned to you. Pickup: Pune",
      timestamp: "2025-11-08T15:30:00Z",
      read: false,
      actionable: true,
      bookingId: "BK157",
    },
    {
      id: "N002",
      type: "payment",
      title: "Commission Credited",
      message: "₹1,250 commission has been credited to your account",
      timestamp: "2025-11-08T14:00:00Z",
      read: false,
      actionable: false,
    },
    {
      id: "N003",
      type: "booking",
      title: "Booking Completed",
      message: "Booking #BK154 marked as delivered successfully",
      timestamp: "2025-11-08T12:15:00Z",
      read: true,
      actionable: false,
    },
    {
      id: "N004",
      type: "system",
      title: "App Update Available",
      message: "Version 2.1.0 is now available with new features",
      timestamp: "2025-11-08T10:00:00Z",
      read: false,
      actionable: true,
    },
    {
      id: "N005",
      type: "booking",
      title: "Booking In Transit",
      message: "Booking #BK153 is now in transit to Mumbai",
      timestamp: "2025-11-08T09:30:00Z",
      read: true,
      actionable: false,
    },
    {
      id: "N006",
      type: "payment",
      title: "Pending Payment",
      message: "₹5,400 pending payment will be processed on Nov 11",
      timestamp: "2025-11-07T18:00:00Z",
      read: true,
      actionable: false,
    },
    {
      id: "N007",
      type: "alert",
      title: "Delivery Delayed",
      message: "Booking #BK152 delivery delayed due to weather conditions",
      timestamp: "2025-11-07T16:45:00Z",
      read: true,
      actionable: true,
      bookingId: "BK152",
    },
    {
      id: "N008",
      type: "system",
      title: "Maintenance Scheduled",
      message: "Server maintenance scheduled on Nov 10, 2AM-4AM",
      timestamp: "2025-11-07T12:00:00Z",
      read: true,
      actionable: false,
    },
  ]);

  const filteredNotifications =
    selectedFilter === "all"
      ? notifications
      : notifications.filter((n) => n.type === selectedFilter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

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
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllRead}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
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

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="bell-off-outline" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification) => {
              const typeConfig = notificationTypes[notification.type];
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.notificationUnread,
                  ]}
                  onPress={() => markAsRead(notification.id)}
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

                    {notification.actionable && (
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                          View Details
                        </Text>
                        <Icon
                          name="chevron-right"
                          size={16}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    alignItems: "center",
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
  markAllRead: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  filterContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[600],
  },
  filterTextActive: {
    color: colors.white,
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
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    marginRight: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[500],
    marginTop: spacing.md,
  },
});
