import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { format } from "date-fns";

export default function EnhancedReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedChart, setSelectedChart] = useState("revenue");

  const periodOptions = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6,
    },
    bookings: {
      current: 167,
      previous: 142,
      growth: 17.6,
    },
    avgDeliveryTime: {
      current: 28, // hours
      previous: 32,
      improvement: 12.5,
    },
    successRate: {
      current: 96.4,
      previous: 94.2,
      growth: 2.3,
    },
  };

  const bookingsByStatus = [
    {
      status: "Delivered",
      count: 135,
      percentage: 80.8,
      color: colors.success,
    },
    { status: "In Transit", count: 18, percentage: 10.8, color: colors.info },
    { status: "Pending", count: 10, percentage: 6.0, color: colors.warning },
    { status: "Cancelled", count: 4, percentage: 2.4, color: colors.error },
  ];

  const truckTypePerformance = [
    { type: "Mini Truck", bookings: 45, revenue: 32000 },
    { type: "Pickup Truck", bookings: 62, revenue: 48000 },
    { type: "Medium Truck", bookings: 38, revenue: 28000 },
    { type: "Heavy Truck", bookings: 22, revenue: 17000 },
  ];

  const topRoutes = [
    { from: "Mumbai", to: "Pune", bookings: 28, revenue: 24500 },
    { from: "Delhi", to: "Jaipur", bookings: 22, revenue: 19800 },
    { from: "Bangalore", to: "Chennai", bookings: 18, revenue: 16200 },
    { from: "Ahmedabad", to: "Surat", bookings: 15, revenue: 13500 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics & Reports</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Icon name="download" size={20} color={colors.primary} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {periodOptions.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodChip,
                selectedPeriod === period.id && styles.periodChipActive,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.id && styles.periodTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Icon name="currency-inr" size={24} color={colors.success} />
                <View
                  style={[
                    styles.trendBadge,
                    { backgroundColor: colors.success + "20" },
                  ]}
                >
                  <Icon name="trending-up" size={12} color={colors.success} />
                  <Text style={[styles.trendText, { color: colors.success }]}>
                    {analyticsData.revenue.growth}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>
                ₹{analyticsData.revenue.current.toLocaleString()}
              </Text>
              <Text style={styles.metricLabel}>Total Revenue</Text>
              <Text style={styles.metricCompare}>
                vs ₹{analyticsData.revenue.previous.toLocaleString()} last
                period
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Icon name="package-variant" size={24} color={colors.info} />
                <View
                  style={[
                    styles.trendBadge,
                    { backgroundColor: colors.info + "20" },
                  ]}
                >
                  <Icon name="trending-up" size={12} color={colors.info} />
                  <Text style={[styles.trendText, { color: colors.info }]}>
                    {analyticsData.bookings.growth}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>
                {analyticsData.bookings.current}
              </Text>
              <Text style={styles.metricLabel}>Total Bookings</Text>
              <Text style={styles.metricCompare}>
                vs {analyticsData.bookings.previous} last period
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Icon name="clock-fast" size={24} color={colors.primary} />
                <View
                  style={[
                    styles.trendBadge,
                    { backgroundColor: colors.primary + "20" },
                  ]}
                >
                  <Icon name="trending-down" size={12} color={colors.primary} />
                  <Text style={[styles.trendText, { color: colors.primary }]}>
                    {analyticsData.avgDeliveryTime.improvement}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>
                {analyticsData.avgDeliveryTime.current}h
              </Text>
              <Text style={styles.metricLabel}>Avg. Delivery Time</Text>
              <Text style={styles.metricCompare}>
                vs {analyticsData.avgDeliveryTime.previous}h last period
              </Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Icon name="check-circle" size={24} color={colors.success} />
                <View
                  style={[
                    styles.trendBadge,
                    { backgroundColor: colors.success + "20" },
                  ]}
                >
                  <Icon name="trending-up" size={12} color={colors.success} />
                  <Text style={[styles.trendText, { color: colors.success }]}>
                    {analyticsData.successRate.growth}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>
                {analyticsData.successRate.current}%
              </Text>
              <Text style={styles.metricLabel}>Success Rate</Text>
              <Text style={styles.metricCompare}>
                vs {analyticsData.successRate.previous}% last period
              </Text>
            </View>
          </View>
        </View>

        {/* Bookings by Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings by Status</Text>
          <View style={styles.chartCard}>
            {bookingsByStatus.map((item, index) => (
              <View key={index} style={styles.statusRow}>
                <View style={styles.statusInfo}>
                  <View
                    style={[styles.statusDot, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.statusLabel}>{item.status}</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: spacing.sm }}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.statusCount}>{item.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Truck Type Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance by Truck Type</Text>
          {truckTypePerformance.map((truck, index) => (
            <View key={index} style={styles.performanceCard}>
              <View style={styles.performanceHeader}>
                <Icon name="truck" size={20} color={colors.primary} />
                <Text style={styles.performanceTitle}>{truck.type}</Text>
              </View>
              <View style={styles.performanceStats}>
                <View style={styles.performanceStat}>
                  <Text style={styles.performanceStatValue}>
                    {truck.bookings}
                  </Text>
                  <Text style={styles.performanceStatLabel}>Bookings</Text>
                </View>
                <View style={styles.performanceStat}>
                  <Text style={styles.performanceStatValue}>
                    ₹{truck.revenue.toLocaleString()}
                  </Text>
                  <Text style={styles.performanceStatLabel}>Revenue</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Top Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Routes</Text>
          {topRoutes.map((route, index) => (
            <View key={index} style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <Text style={styles.routeRank}>#{index + 1}</Text>
                <View style={{ flex: 1 }}>
                  <View style={styles.routePath}>
                    <Text style={styles.routeCity}>{route.from}</Text>
                    <Icon
                      name="arrow-right"
                      size={16}
                      color={colors.gray[400]}
                    />
                    <Text style={styles.routeCity}>{route.to}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.routeStats}>
                <View style={styles.routeStat}>
                  <Icon
                    name="package-variant"
                    size={14}
                    color={colors.gray[600]}
                  />
                  <Text style={styles.routeStatText}>
                    {route.bookings} bookings
                  </Text>
                </View>
                <View style={styles.routeStat}>
                  <Icon
                    name="currency-inr"
                    size={14}
                    color={colors.gray[600]}
                  />
                  <Text style={styles.routeStatText}>
                    ₹{route.revenue.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Generate Report */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.generateButton}>
            <Icon name="file-document-outline" size={20} color={colors.white} />
            <Text style={styles.generateText}>Generate Detailed Report</Text>
          </TouchableOpacity>
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
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  exportText: {
    color: colors.primary,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
  periodContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  periodChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: spacing.sm,
  },
  periodChipActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
  },
  periodTextActive: {
    color: colors.white,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.xs,
  },
  metricCard: {
    width: "48%",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    margin: spacing.xs,
    marginBottom: spacing.sm,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  trendText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  metricCompare: {
    fontSize: 11,
    color: colors.gray[500],
  },
  chartCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: 110,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusLabel: {
    fontSize: 13,
    color: colors.gray[700],
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.gray[100],
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  statusCount: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[900],
    width: 30,
    textAlign: "right",
  },
  performanceCard: {
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
  performanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginLeft: spacing.sm,
  },
  performanceStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  performanceStat: {
    alignItems: "center",
  },
  performanceStatValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
  },
  performanceStatLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  routeCard: {
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
  routeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  routeRank: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    width: 40,
  },
  routePath: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeCity: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginHorizontal: spacing.xs,
  },
  routeStats: {
    flexDirection: "row",
    paddingLeft: 40,
  },
  routeStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
  },
  routeStatText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  generateText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
