import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f9e3be",
              },
              headerShadowVisible: false,
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push("/AddPet")}>
                  <MaterialIcons name="add" size={30} color="black" />
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerTitle: "Pet Adoption",
              }}
            />
            <Stack.Screen
              name="[petId]"
              options={{
                headerTitle: "Pet Details",
              }}
            />
            <Stack.Screen
              name="AddPet"
              options={{
                headerTitle: "Add Pet",
                presentation: "modal",
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="close" size={30} color="black" />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
