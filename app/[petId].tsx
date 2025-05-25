import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOnePet } from "@/api/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();

  const {
    data: pet,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getOnePet(petId),
    enabled: !!petId,
  });

  if (isLoading) return <ActivityIndicator size="large" color="black" />;
  if (isError)
    return (
      <View style={styles.container}>
        <Text>Error loading pet. <Text onPress={refetch}>Try again</Text></Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
