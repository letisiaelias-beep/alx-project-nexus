// src/app/(home)/_layout.tsx
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#34967C",
        tabBarInactiveTintColor: "#999",
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <FontAwesome name="dashboard" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="pollresults"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}


