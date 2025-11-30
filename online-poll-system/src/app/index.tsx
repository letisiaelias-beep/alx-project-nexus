// src/app/index.tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Welcome to Project Nexus!</Text>
    </SafeAreaView>
  );
}


