import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PetItem = ({ pet }: { pet: any }) => {
  const queryClient = useQueryClient();

  const { mutate: deletePet, isPending } = useMutation({
    mutationFn: () =>
      axios.delete(`https://pets-react-query-backend.eapi.joincoded.com/pets/${pet.id}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["pets"] });
      const previousPets = queryClient.getQueryData(["pets"]);
      queryClient.setQueryData(["pets"], (old: any) =>
        old.filter((p: any) => p.id !== pet.id)
      );
      return { previousPets };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["pets"], context?.previousPets);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return (
    <View style={styles.card}>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.name}>{pet.name}</Text>
      <Text style={styles.type}>{pet.type}</Text>

      <TouchableOpacity style={styles.button} onPress={() => deletePet()}>
        <Text style={styles.buttonText}>
          {isPending ? "Adopting..." : "Adopt"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  type: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
});
