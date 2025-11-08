import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../../config/theme";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="truck-fast" size={80} color={colors.white} />
        <Text style={styles.title}>Relogistics</Text>
        <Text style={styles.subtitle}>Your Trusted Shipping Partner</Text>
      </View>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.sm,
  },
  version: {
    position: "absolute",
    bottom: spacing.xl,
    color: colors.white,
    opacity: 0.7,
    fontSize: 14,
  },
});
