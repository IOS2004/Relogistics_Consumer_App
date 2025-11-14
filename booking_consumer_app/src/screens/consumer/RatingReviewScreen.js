import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";
import { format } from "date-fns";

export default function RatingReviewScreen({ route, navigation }) {
  const { bookingId, driverName } = route.params || {
    bookingId: "BK001",
    driverName: "Rajesh Kumar",
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: "punctual", label: "Punctual", icon: "clock-check" },
    { id: "professional", label: "Professional", icon: "account-tie" },
    { id: "careful", label: "Careful Handling", icon: "hand-heart" },
    { id: "friendly", label: "Friendly", icon: "emoticon-happy" },
    { id: "clean", label: "Clean Vehicle", icon: "car-wash" },
  ];

  // Mock previous reviews
  const previousReviews = [
    {
      id: "R001",
      bookingId: "BK003",
      driver: "Suresh Patel",
      rating: 5,
      review:
        "Excellent service! Driver was very professional and careful with my goods.",
      date: "2025-11-05T14:30:00Z",
      categories: ["punctual", "professional", "careful"],
    },
    {
      id: "R002",
      bookingId: "BK002",
      driver: "Amit Singh",
      rating: 4,
      review: "Good experience overall. Delivery was on time.",
      date: "2025-11-02T10:15:00Z",
      categories: ["punctual", "friendly"],
    },
  ];

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    // Submit rating and review
    alert("Thank you for your feedback!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.title}>Rate & Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Driver Info */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Icon name="account" size={32} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>{driverName}</Text>
            <Text style={styles.bookingId}>Booking #{bookingId}</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Icon
                  name={star <= rating ? "star" : "star-outline"}
                  size={40}
                  color={star <= rating ? colors.warning : colors.gray[300]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </Text>
          )}
        </View>

        {/* Category Tags */}
        {rating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What did you like?</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategories.includes(category.id) &&
                      styles.categoryChipActive,
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <Icon
                    name={category.icon}
                    size={16}
                    color={
                      selectedCategories.includes(category.id)
                        ? colors.white
                        : colors.gray[600]
                    }
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategories.includes(category.id) &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Review Text */}
        {rating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Share your experience (Optional)
            </Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Tell us more about your experience..."
              placeholderTextColor={colors.gray[400]}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={review}
              onChangeText={setReview}
            />
          </View>
        )}

        {/* Submit Button */}
        {rating > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Previous Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Previous Reviews</Text>
          {previousReviews.map((prevReview) => (
            <View key={prevReview.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewDriver}>{prevReview.driver}</Text>
                  <Text style={styles.reviewBooking}>
                    Booking #{prevReview.bookingId}
                  </Text>
                </View>
                <View style={styles.reviewRating}>
                  <Icon name="star" size={16} color={colors.warning} />
                  <Text style={styles.reviewRatingText}>
                    {prevReview.rating}.0
                  </Text>
                </View>
              </View>

              {prevReview.categories.length > 0 && (
                <View style={styles.reviewCategories}>
                  {prevReview.categories.map((catId) => {
                    const cat = categories.find((c) => c.id === catId);
                    return (
                      <View key={catId} style={styles.reviewCategoryTag}>
                        <Icon
                          name={cat.icon}
                          size={12}
                          color={colors.primary}
                        />
                        <Text style={styles.reviewCategoryText}>
                          {cat.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}

              <Text style={styles.reviewText}>{prevReview.review}</Text>

              <Text style={styles.reviewDate}>
                {format(new Date(prevReview.date), "MMM dd, yyyy")}
              </Text>
            </View>
          ))}
        </View>

        {/* Info Note */}
        <View style={styles.infoCard}>
          <Icon name="information" size={20} color={colors.info} />
          <Text style={styles.infoText}>
            Your honest feedback helps us improve our service and helps other
            customers make informed decisions.
          </Text>
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
  driverCard: {
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
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[900],
  },
  bookingId: {
    fontSize: 13,
    color: colors.gray[600],
    marginTop: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  starButton: {
    paddingHorizontal: spacing.xs,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.xs,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    margin: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  categoryTextActive: {
    color: colors.white,
  },
  reviewInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 14,
    color: colors.gray[900],
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  reviewCard: {
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
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  reviewDriver: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray[900],
  },
  reviewBooking: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.warning + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.gray[900],
    marginLeft: 4,
  },
  reviewCategories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.sm,
  },
  reviewCategoryTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary + "10",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  reviewCategoryText: {
    fontSize: 11,
    color: colors.primary,
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 13,
    color: colors.gray[700],
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.gray[500],
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: colors.info + "10",
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.info,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.gray[700],
    lineHeight: 18,
    marginLeft: spacing.sm,
  },
});
