import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { format } from "date-fns";

const periodOptions = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

export default function EarningsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock earnings data
  const earningsData = {
    today: {
      totalEarnings: 4500,
      commission: 450,
      bookings: 6,
      pending: 1200,
    },
    week: {
      totalEarnings: 28500,
      commission: 2850,
      bookings: 38,
      pending: 5400,
    },
    month: {
      totalEarnings: 125000,
      commission: 12500,
      bookings: 167,
      pending: 18000,
    },
  };

  const transactions = [
    {
      id: "TXN001",
      bookingId: "BK001",
      amount: 850,
      commission: 85,
      date: "2025-11-08T10:30:00Z",
      status: "paid",
      customer: "John Doe",
    },
    {
      id: "TXN002",
      bookingId: "BK002",
      amount: 1250,
      commission: 125,
      date: "2025-11-08T14:00:00Z",
      status: "pending",
      customer: "Jane Smith",
    },
    {
      id: "TXN003",
      bookingId: "BK003",
      amount: 450,
      commission: 45,
      date: "2025-11-07T09:15:00Z",
      status: "paid",
      customer: "Mike Johnson",
    },
    {
      id: "TXN004",
      bookingId: "BK005",
      amount: 2100,
      commission: 210,
      date: "2025-11-06T16:45:00Z",
      status: "paid",
      customer: "Sarah Williams",
    },
  ];

  const current = earningsData[selectedPeriod];
  const commissionRate = 10; // 10% commission

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Earnings & Commission</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Icon name="cash-multiple" size={20} color={colors.white} />
          <Text style={styles.withdrawText}>Withdraw</Text>
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

        {/* Earnings Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon
              name="wallet"
              size={32}
              color={colors.primary}
              style={styles.walletIcon}
            />
            <View>
              <Text style={styles.summaryLabel}>Total Earnings</Text>
              <Text style={styles.summaryAmount}>
                ₹{current.totalEarnings.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Icon name="percent" size={20} color={colors.success} />
              <View style={{ marginLeft: spacing.sm }}>
                <Text style={styles.summaryItemLabel}>Commission</Text>
                <Text style={styles.summaryItemValue}>
                  ₹{current.commission.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Icon name="package-variant" size={20} color={colors.info} />
              <View style={{ marginLeft: spacing.sm }}>
                <Text style={styles.summaryItemLabel}>Bookings</Text>
                <Text style={styles.summaryItemValue}>{current.bookings}</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Icon name="clock-outline" size={20} color={colors.warning} />
              <View style={{ marginLeft: spacing.sm }}>
                <Text style={styles.summaryItemLabel}>Pending</Text>
                <Text style={styles.summaryItemValue}>
                  ₹{current.pending.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Commission Rate */}
          <View style={styles.commissionInfo}>
            <Icon name="information" size={16} color={colors.gray[600]} />
            <Text style={styles.commissionInfoText}>
              You earn {commissionRate}% commission on each successful booking
            </Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.map((txn) => (
            <View key={txn.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionId}>#{txn.bookingId}</Text>
                  <Text style={styles.transactionCustomer}>{txn.customer}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        txn.status === "paid"
                          ? colors.success + "20"
                          : colors.warning + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          txn.status === "paid"
                            ? colors.success
                            : colors.warning,
                      },
                    ]}
                  >
                    {txn.status === "paid" ? "Paid" : "Pending"}
                  </Text>
                </View>
              </View>

              <View style={styles.transactionDetails}>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Booking Amount:</Text>
                  <Text style={styles.transactionValue}>
                    ₹{txn.amount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Your Commission:</Text>
                  <Text
                    style={[styles.transactionValue, styles.commissionValue]}
                  >
                    ₹{txn.commission.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.transactionRow}>
                  <Text style={styles.transactionLabel}>Date:</Text>
                  <Text style={styles.transactionValue}>
                    {format(new Date(txn.date), "MMM dd, yyyy hh:mm a")}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payout Schedule */}
        <View style={styles.section}>
          <View style={styles.payoutCard}>
            <Icon name="calendar-clock" size={24} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.payoutTitle}>Payout Schedule</Text>
              <Text style={styles.payoutText}>
                Earnings are processed every Monday. Next payout on Nov 11, 2025
              </Text>
            </View>
          </View>
        </View>

        {/* Bank Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bank Account</Text>
          <View style={styles.bankCard}>
            <Icon name="bank" size={24} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.bankName}>HDFC Bank</Text>
              <Text style={styles.bankAccount}>XXXX XXXX XXXX 1234</Text>
            </View>
            <TouchableOpacity>
              <Icon name="pencil" size={20} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
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
  withdrawButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  withdrawText: {
    color: colors.white,
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
  summaryCard: {
    backgroundColor: colors.white,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  walletIcon: {
    marginRight: spacing.md,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray[900],
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.md,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: spacing.md,
  },
  summaryItemLabel: {
    fontSize: 12,
    color: colors.gray[600],
  },
  summaryItemValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
  },
  commissionInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray[50],
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  commissionInfoText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: spacing.xs,
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  transactionCard: {
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
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
  },
  transactionCustomer: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  transactionDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    paddingTop: spacing.sm,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  transactionLabel: {
    fontSize: 13,
    color: colors.gray[600],
  },
  transactionValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[900],
  },
  commissionValue: {
    color: colors.success,
  },
  payoutCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  payoutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 4,
  },
  payoutText: {
    fontSize: 13,
    color: colors.gray[600],
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  bankName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
  },
  bankAccount: {
    fontSize: 13,
    color: colors.gray[600],
    marginTop: 2,
  },
});
