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
import { colors, spacing } from "../../config/theme";
import { format } from "date-fns";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "credit", label: "Credit" },
  { id: "debit", label: "Debit" },
];

export default function WalletScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock wallet data
  const wallet = {
    balance: 5420,
    totalEarnings: 125000,
    totalSpent: 119580,
    linkedPayments: [
      { id: "upi1", type: "UPI", name: "john@paytm", primary: true },
      { id: "card1", type: "Card", name: "HDFC **** 1234", primary: false },
    ],
  };

  const transactions = [
    {
      id: "T001",
      type: "credit",
      title: "Booking Payment Received",
      description: "Payment for booking #BK003",
      amount: 3304,
      date: "2025-11-08T16:30:00Z",
      status: "completed",
      method: "UPI",
    },
    {
      id: "T002",
      type: "debit",
      title: "Withdrawal",
      description: "Bank transfer to HDFC Bank",
      amount: 10000,
      date: "2025-11-07T10:00:00Z",
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: "T003",
      type: "credit",
      title: "Refund",
      description: "Refund for cancelled booking #BK002",
      amount: 1500,
      date: "2025-11-06T14:20:00Z",
      status: "completed",
      method: "Wallet",
    },
    {
      id: "T004",
      type: "credit",
      title: "Booking Payment Received",
      description: "Payment for booking #BK001",
      amount: 2850,
      date: "2025-11-05T09:15:00Z",
      status: "completed",
      method: "Card",
    },
    {
      id: "T005",
      type: "debit",
      title: "Service Charge",
      description: "Platform fee for booking #BK003",
      amount: 165,
      date: "2025-11-05T09:00:00Z",
      status: "completed",
      method: "Wallet",
    },
    {
      id: "T006",
      type: "credit",
      title: "Bonus Credit",
      description: "Referral bonus from John Doe",
      amount: 500,
      date: "2025-11-03T12:30:00Z",
      status: "completed",
      method: "Wallet",
    },
  ];

  const filteredTransactions =
    selectedFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === selectedFilter);

  const handleAddMoney = () => {
    Alert.alert("Add Money", "Add money to your wallet");
  };

  const handleWithdraw = () => {
    Alert.alert("Withdraw", "Withdraw money from wallet to bank account");
  };

  const handleAddPaymentMethod = () => {
    Alert.alert("Add Payment Method", "Add a new payment method");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
        <TouchableOpacity>
          <Icon name="history" size={24} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Icon name="wallet" size={32} color={colors.white} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>
                ₹{wallet.balance.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.balanceStats}>
            <View style={styles.balanceStat}>
              <Icon name="trending-up" size={16} color={colors.white} />
              <View style={{ marginLeft: spacing.xs }}>
                <Text style={styles.balanceStatLabel}>Total Earned</Text>
                <Text style={styles.balanceStatValue}>
                  ₹{wallet.totalEarnings.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.balanceStat}>
              <Icon name="trending-down" size={16} color={colors.white} />
              <View style={{ marginLeft: spacing.xs }}>
                <Text style={styles.balanceStatLabel}>Total Spent</Text>
                <Text style={styles.balanceStatValue}>
                  ₹{wallet.totalSpent.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.balanceActions}>
            <TouchableOpacity
              style={styles.balanceButton}
              onPress={handleAddMoney}
            >
              <Icon name="plus-circle" size={20} color={colors.primary} />
              <Text style={styles.balanceButtonText}>Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.balanceButton}
              onPress={handleWithdraw}
            >
              <Icon name="bank-transfer-out" size={20} color={colors.primary} />
              <Text style={styles.balanceButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="currency-inr" size={24} color={colors.success} />
              <Text style={styles.statValue}>
                ₹
                {transactions
                  .filter((t) => t.type === "credit")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Credits</Text>
            </View>

            <View style={styles.statCard}>
              <Icon name="cash-minus" size={24} color={colors.error} />
              <Text style={styles.statValue}>
                ₹
                {transactions
                  .filter((t) => t.type === "debit")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Debits</Text>
            </View>

            <View style={styles.statCard}>
              <Icon name="swap-horizontal" size={24} color={colors.info} />
              <Text style={styles.statValue}>{transactions.length}</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={handleAddPaymentMethod}>
              <Icon name="plus" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {wallet.linkedPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View
                style={[
                  styles.paymentIcon,
                  {
                    backgroundColor:
                      payment.type === "UPI"
                        ? colors.info + "20"
                        : colors.success + "20",
                  },
                ]}
              >
                <Icon
                  name={payment.type === "UPI" ? "qrcode" : "credit-card"}
                  size={20}
                  color={payment.type === "UPI" ? colors.info : colors.success}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.paymentName}>{payment.name}</Text>
                <Text style={styles.paymentType}>{payment.type}</Text>
              </View>

              {payment.primary && (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryText}>Primary</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          {/* Filter */}
          <View style={styles.filterContainer}>
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
          </View>

          {/* Transactions List */}
          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIcon,
                  {
                    backgroundColor:
                      transaction.type === "credit"
                        ? colors.success + "20"
                        : colors.error + "20",
                  },
                ]}
              >
                <Icon
                  name={
                    transaction.type === "credit"
                      ? "arrow-down-left"
                      : "arrow-up-right"
                  }
                  size={20}
                  color={
                    transaction.type === "credit"
                      ? colors.success
                      : colors.error
                  }
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <View style={styles.transactionFooter}>
                  <Text style={styles.transactionMethod}>
                    {transaction.method}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        transaction.type === "credit"
                          ? colors.success
                          : colors.error,
                    },
                  ]}
                >
                  {transaction.type === "credit" ? "+" : "-"}₹
                  {transaction.amount.toLocaleString()}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: colors.success + "20" },
                  ]}
                >
                  <Text style={[styles.statusText, { color: colors.success }]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Help Card */}
        <View style={styles.helpCard}>
          <Icon name="help-circle" size={24} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Contact support for any wallet-related queries
            </Text>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-right" size={20} color={colors.gray[400]} />
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
  balanceCard: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  balanceLabel: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.white,
    marginTop: 4,
  },
  balanceStats: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  balanceStat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  balanceStatLabel: {
    fontSize: 11,
    color: colors.white,
    opacity: 0.8,
  },
  balanceStatValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
    marginTop: 2,
  },
  balanceActions: {
    flexDirection: "row",
    marginTop: spacing.sm,
  },
  balanceButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
  },
  balanceButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  statsGrid: {
    flexDirection: "row",
    marginHorizontal: -spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    margin: spacing.xs,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    color: colors.gray[600],
    marginTop: 2,
    textAlign: "center",
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
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
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  paymentType: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  primaryBadge: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: spacing.sm,
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
  transactionCard: {
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  transactionDescription: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  transactionFooter: {
    flexDirection: "row",
    marginTop: spacing.xs,
  },
  transactionMethod: {
    fontSize: 11,
    color: colors.gray[500],
    marginRight: spacing.sm,
  },
  transactionDate: {
    fontSize: 11,
    color: colors.gray[500],
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  helpText: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
});
