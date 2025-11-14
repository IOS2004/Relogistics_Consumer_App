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

export default function InvoiceScreen({ route, navigation }) {
  const { bookingId } = route.params || { bookingId: "BK001" };

  // Mock invoice data
  const invoice = {
    invoiceNumber: "INV-2025-001",
    bookingId: "BK001",
    date: "2025-11-08T10:30:00Z",
    dueDate: "2025-11-15T23:59:59Z",
    status: "paid",

    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      address: "123 Main Street, Mumbai, Maharashtra - 400001",
    },

    company: {
      name: "ReLogistics Pvt Ltd",
      gst: "27AABCU9603R1ZM",
      pan: "AABCU9603R",
      address: "456 Business Park, Pune, Maharashtra - 411001",
      phone: "1800-123-4567",
      email: "billing@relogistics.com",
    },

    items: [
      {
        description: "Pickup Truck - Mini",
        quantity: 1,
        rate: 2000,
        amount: 2000,
      },
      {
        description: "Loading & Unloading Charges",
        quantity: 1,
        rate: 500,
        amount: 500,
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        rate: 300,
        amount: 300,
      },
    ],

    route: {
      from: "Mumbai, Maharashtra",
      to: "Pune, Maharashtra",
      distance: "148 km",
    },

    subtotal: 2800,
    cgst: 252, // 9%
    sgst: 252, // 9%
    total: 3304,

    payment: {
      method: "UPI",
      transactionId: "TXN987654321",
      date: "2025-11-08T11:00:00Z",
    },
  };

  const handleDownload = () => {
    Alert.alert("Download Invoice", "Invoice will be downloaded as PDF");
  };

  const handleShare = () => {
    Alert.alert("Share Invoice", "Invoice will be shared");
  };

  const handlePrint = () => {
    Alert.alert("Print Invoice", "Invoice will be sent to printer");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.title}>Invoice</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Actions */}
      <View style={styles.actionsBar}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Icon name="download" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share-variant" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
          <Icon name="printer" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Print</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Invoice Preview */}
        <View style={styles.invoiceContainer}>
          {/* Invoice Header */}
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.companyName}>{invoice.company.name}</Text>
              <Text style={styles.companyDetails}>
                {invoice.company.address}
              </Text>
              <Text style={styles.companyDetails}>
                GST: {invoice.company.gst}
              </Text>
              <Text style={styles.companyDetails}>
                Phone: {invoice.company.phone}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    invoice.status === "paid"
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
                      invoice.status === "paid"
                        ? colors.success
                        : colors.warning,
                  },
                ]}
              >
                {invoice.status === "paid" ? "PAID" : "PENDING"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Invoice Info */}
          <View style={styles.invoiceInfo}>
            <View style={{ flex: 1 }}>
              <Text style={styles.invoiceLabel}>Invoice Number</Text>
              <Text style={styles.invoiceValue}>{invoice.invoiceNumber}</Text>

              <Text style={[styles.invoiceLabel, { marginTop: spacing.sm }]}>
                Invoice Date
              </Text>
              <Text style={styles.invoiceValue}>
                {format(new Date(invoice.date), "MMM dd, yyyy")}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.invoiceLabel}>Booking ID</Text>
              <Text style={styles.invoiceValue}>#{invoice.bookingId}</Text>

              <Text style={[styles.invoiceLabel, { marginTop: spacing.sm }]}>
                Due Date
              </Text>
              <Text style={styles.invoiceValue}>
                {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Bill To */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={styles.customerName}>{invoice.customer.name}</Text>
            <Text style={styles.customerDetails}>
              {invoice.customer.address}
            </Text>
            <Text style={styles.customerDetails}>
              Email: {invoice.customer.email}
            </Text>
            <Text style={styles.customerDetails}>
              Phone: {invoice.customer.phone}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Route Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Route:</Text>
            <View style={styles.routeRow}>
              <Icon name="map-marker" size={16} color={colors.primary} />
              <Text style={styles.routeText}>{invoice.route.from}</Text>
            </View>
            <View style={styles.routeRow}>
              <Icon name="map-marker-check" size={16} color={colors.success} />
              <Text style={styles.routeText}>{invoice.route.to}</Text>
            </View>
            <Text style={styles.routeDistance}>
              Distance: {invoice.route.distance}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>
                Description
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>Qty</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Rate</Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { flex: 1, textAlign: "right" },
                ]}
              >
                Amount
              </Text>
            </View>

            {invoice.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.7 }]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  ₹{item.rate}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "right" }]}
                >
                  ₹{item.amount}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>₹{invoice.subtotal}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>CGST (9%):</Text>
              <Text style={styles.totalValue}>₹{invoice.cgst}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>SGST (9%):</Text>
              <Text style={styles.totalValue}>₹{invoice.sgst}</Text>
            </View>

            <View style={[styles.divider, { marginVertical: spacing.sm }]} />

            <View style={styles.totalRow}>
              <Text style={styles.grandTotalLabel}>Total Amount:</Text>
              <Text style={styles.grandTotalValue}>₹{invoice.total}</Text>
            </View>
          </View>

          {/* Payment Details */}
          {invoice.status === "paid" && (
            <>
              <View style={styles.divider} />
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Details:</Text>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Method:</Text>
                  <Text style={styles.paymentValue}>
                    {invoice.payment.method}
                  </Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Transaction ID:</Text>
                  <Text style={styles.paymentValue}>
                    {invoice.payment.transactionId}
                  </Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Payment Date:</Text>
                  <Text style={styles.paymentValue}>
                    {format(
                      new Date(invoice.payment.date),
                      "MMM dd, yyyy hh:mm a"
                    )}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Footer Note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for choosing {invoice.company.name}!
            </Text>
            <Text style={styles.footerNote}>
              This is a computer-generated invoice and does not require a
              signature.
            </Text>
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
  actionsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: "600",
  },
  invoiceContainer: {
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 12,
    color: colors.gray[600],
    lineHeight: 18,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: spacing.md,
  },
  invoiceInfo: {
    flexDirection: "row",
  },
  invoiceLabel: {
    fontSize: 11,
    color: colors.gray[500],
    textTransform: "uppercase",
  },
  invoiceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray[900],
    marginBottom: 4,
  },
  customerDetails: {
    fontSize: 13,
    color: colors.gray[600],
    lineHeight: 20,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  routeText: {
    fontSize: 13,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  routeDistance: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
  table: {
    marginBottom: spacing.sm,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    padding: spacing.sm,
    borderRadius: 6,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[700],
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  tableCell: {
    fontSize: 13,
    color: colors.gray[700],
  },
  totals: {
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
    minWidth: 200,
  },
  totalLabel: {
    fontSize: 13,
    color: colors.gray[700],
  },
  totalValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[900],
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.gray[900],
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  paymentLabel: {
    fontSize: 13,
    color: colors.gray[600],
    width: 120,
  },
  paymentValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[900],
    flex: 1,
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  footerNote: {
    fontSize: 11,
    color: colors.gray[500],
    textAlign: "center",
  },
});
