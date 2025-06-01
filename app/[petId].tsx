import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchPetById } from "@/api/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();

  const {
    data: pet,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => fetchPetById(petId as string),
    enabled: !!petId,
  });

  if (isLoading) return <ActivityIndicator size="large" color="black" />;
  if (isError)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Could not load pet details.
        </Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ color: "blue", textAlign: "center" }}>Try again</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}>{pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    textAlign: "center",
  },
});
