import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import AuthStack from "./AuthStack";
import ConsumerTabs from "./ConsumerTabs";
import AgentTabs from "./AgentTabs";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : userRole === "consumer" ? (
        <Stack.Screen name="ConsumerMain" component={ConsumerTabs} />
      ) : (
        <Stack.Screen name="AgentMain" component={AgentTabs} />
      )}
    </Stack.Navigator>
  );
}
