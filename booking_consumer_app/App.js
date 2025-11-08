import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { BookingProvider } from "./src/contexts/BookingContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { theme } from "./src/config/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <BookingProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <RootNavigator />
          </NavigationContainer>
        </BookingProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
