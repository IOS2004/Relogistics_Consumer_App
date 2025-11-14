import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";

const categories = [
  {
    id: "account",
    title: "Account & Profile",
    icon: "account-circle",
    color: colors.primary,
  },
  {
    id: "bookings",
    title: "Bookings & Orders",
    icon: "package-variant",
    color: colors.info,
  },
  {
    id: "payments",
    title: "Payments & Earnings",
    icon: "currency-inr",
    color: colors.success,
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: "tools",
    color: colors.warning,
  },
];

const faqs = [
  {
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "Go to Profile tab, tap on your profile picture or name, and update your details. Don't forget to save changes.",
  },
  {
    category: "account",
    question: "How do I change my password?",
    answer:
      "Navigate to Profile > Settings > Security, then select 'Change Password'. Enter your current password and new password.",
  },
  {
    category: "bookings",
    question: "How do I assign a truck to a booking?",
    answer:
      "From Dashboard, select the pending booking, tap 'Assign Truck', choose an available truck and driver, then confirm assignment.",
  },
  {
    category: "bookings",
    question: "Can I reassign a truck after assignment?",
    answer:
      "Yes, go to Booking Details, tap 'Change Assignment', select a new truck and driver, then confirm the change.",
  },
  {
    category: "payments",
    question: "When will I receive my commission?",
    answer:
      "Commissions are processed weekly every Monday. All earnings from the previous week will be transferred to your registered bank account.",
  },
  {
    category: "payments",
    question: "How is commission calculated?",
    answer:
      "You earn 10% commission on each successful booking. Commission is calculated on the total booking amount after delivery confirmation.",
  },
  {
    category: "technical",
    question: "App is not loading bookings",
    answer:
      "Check your internet connection. If the issue persists, try logging out and logging back in. Contact support if problem continues.",
  },
];

export default function SupportScreen() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Support & Help</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity style={styles.contactCard}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.success + "20" },
                ]}
              >
                <Icon name="phone" size={24} color={colors.success} />
              </View>
              <Text style={styles.contactLabel}>Call</Text>
              <Text style={styles.contactValue}>1800-123-4567</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.info + "20" },
                ]}
              >
                <Icon name="email" size={24} color={colors.info} />
              </View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@app.com</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Icon name="chat" size={24} color={colors.primary} />
              </View>
              <Text style={styles.contactLabel}>Live Chat</Text>
              <Text style={styles.contactValue}>Chat Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard}>
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: colors.warning + "20" },
                ]}
              >
                <Icon name="ticket" size={24} color={colors.warning} />
              </View>
              <Text style={styles.contactLabel}>Ticket</Text>
              <Text style={styles.contactValue}>Raise Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === null && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === null && styles.categoryTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.id && styles.categoryTextActive,
                  ]}
                >
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFaqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              onPress={() =>
                setExpandedFaq(expandedFaq === index ? null : index)
              }
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Icon
                  name="help-circle-outline"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: spacing.sm }}
                />
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon
                  name={expandedFaq === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={colors.gray[600]}
                />
              </View>
              {expandedFaq === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Ticket Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Tickets</Text>
          <View style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ticketId}>#TKT001</Text>
                <Text style={styles.ticketSubject}>Payment not received</Text>
              </View>
              <View
                style={[
                  styles.ticketStatus,
                  { backgroundColor: colors.warning + "20" },
                ]}
              >
                <Text
                  style={[styles.ticketStatusText, { color: colors.warning }]}
                >
                  In Progress
                </Text>
              </View>
            </View>
            <Text style={styles.ticketDate}>Created on Nov 7, 2025</Text>
            <TouchableOpacity style={styles.viewTicketButton}>
              <Text style={styles.viewTicketText}>View Details</Text>
              <Icon name="chevron-right" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.newTicketButton}>
            <Icon name="plus-circle" size={20} color={colors.white} />
            <Text style={styles.newTicketText}>Raise New Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <Icon
              name="lightbulb-on-outline"
              size={32}
              color={colors.warning}
            />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.tipsTitle}>Quick Tip</Text>
              <Text style={styles.tipsText}>
                Check the FAQ section first - most common issues are already
                answered!
              </Text>
            </View>
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.section}>
          <View style={styles.hoursCard}>
            <Icon name="clock-outline" size={24} color={colors.gray[600]} />
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.hoursTitle}>Support Hours</Text>
              <Text style={styles.hoursText}>
                Monday - Saturday: 9 AM - 9 PM
              </Text>
              <Text style={styles.hoursText}>Sunday: 10 AM - 6 PM</Text>
            </View>
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
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.xs,
  },
  contactCard: {
    width: "48%",
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
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[900],
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    margin: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[600],
  },
  categoryTextActive: {
    color: colors.white,
  },
  faqCard: {
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
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  faqAnswer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    paddingLeft: 28,
  },
  faqAnswerText: {
    fontSize: 13,
    color: colors.gray[700],
    lineHeight: 20,
  },
  ticketCard: {
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
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  ticketId: {
    fontSize: 12,
    color: colors.gray[600],
  },
  ticketSubject: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
    marginTop: 2,
  },
  ticketStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ticketStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  ticketDate: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: spacing.sm,
  },
  viewTicketButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewTicketText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    marginRight: 2,
  },
  newTicketButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
  },
  newTicketText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
    marginLeft: spacing.sm,
  },
  tipsCard: {
    flexDirection: "row",
    backgroundColor: colors.warning + "10",
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 13,
    color: colors.gray[700],
    lineHeight: 20,
  },
  hoursCard: {
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
  hoursTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: 4,
  },
  hoursText: {
    fontSize: 13,
    color: colors.gray[600],
    lineHeight: 18,
  },
});
