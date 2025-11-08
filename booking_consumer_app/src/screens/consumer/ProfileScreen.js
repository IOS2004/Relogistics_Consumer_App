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
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { colors, spacing } from "../../config/theme";

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateProfile({ name, phone, email });
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Icon name="account" size={48} color={colors.white} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Icon name="pencil" size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <>
              <Input
                label="Full Name"
                value={name}
                onChangeText={setName}
                icon="account"
              />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                icon="email"
                keyboardType="email-address"
              />
              <Input
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                icon="phone"
                keyboardType="phone-pad"
              />
              <View style={styles.editActions}>
                <Button
                  variant="outline"
                  onPress={() => {
                    setIsEditing(false);
                    setName(user.name);
                    setPhone(user.phone);
                    setEmail(user.email);
                  }}
                  style={{ flex: 1, marginRight: spacing.sm }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleSave}
                  style={{ flex: 1, marginLeft: spacing.sm }}
                >
                  Save
                </Button>
              </View>
            </>
          ) : (
            <View style={styles.infoCard}>
              <InfoRow icon="account" label="Name" value={user.name} />
              <InfoRow icon="email" label="Email" value={user.email} />
              <InfoRow icon="phone" label="Phone" value={user.phone} />
              <InfoRow icon="badge-account" label="Role" value="Consumer" />
            </View>
          )}
        </View>

        {/* Saved Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          <View style={styles.addressCard}>
            <Icon name="home" size={24} color={colors.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Home</Text>
              <Text style={styles.addressText}>123 Main St, New York, NY</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </View>
          <View style={styles.addressCard}>
            <Icon name="office-building" size={24} color={colors.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Office</Text>
              <Text style={styles.addressText}>456 Oak Ave, Boston, MA</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus-circle" size={20} color={colors.primary} />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <SettingItem icon="bell" label="Notifications" />
          <SettingItem icon="shield-check" label="Privacy" />
          <SettingItem icon="help-circle" label="Help & Support" />
          <SettingItem icon="information" label="About" />
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <Button variant="outline" onPress={handleLogout}>
            <Icon name="logout" size={20} color={colors.error} /> Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Icon name={icon} size={20} color={colors.gray[400]} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SettingItem({ icon, label }) {
  return (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={22} color={colors.gray[600]} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={colors.gray[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  userEmail: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[900],
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.gray[600],
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  editActions: {
    flexDirection: "row",
    marginTop: spacing.md,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  addressInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[900],
  },
  addressText: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderStyle: "dashed",
  },
  addButtonText: {
    marginLeft: spacing.xs,
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    marginLeft: spacing.md,
    fontSize: 16,
    color: colors.gray[900],
  },
});
