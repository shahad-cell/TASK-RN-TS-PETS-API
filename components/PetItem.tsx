import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PetItemProps {
  pet: {
    _id: string;
    name: string;
    description: string;
    type: string;
    image: string;
    image2: string;
  };
}

const PetItem = ({ pet }: PetItemProps) => {
  const [image, setImage] = useState(pet.image);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(`https://pets-react-query-backend.eapi.joincoded.com/pets/${pet._id}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["pets"] });
      const previousPets = queryClient.getQueryData(["pets"]);
      queryClient.setQueryData(["pets"], (old: any[]) =>
        old.filter((p) => p._id !== pet._id)
      );
      return { previousPets };
    },
    onError: (_error, _vars, context) => {
      queryClient.setQueryData(["pets"], context?.previousPets);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return (
    <Link href={`/${pet._id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.petInfo}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.petButton}
            onPress={() => setImage(pet.image2)}
          >
            <Text style={styles.buttonText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adoptButton}
            onPress={() => deleteMutation.mutate()}
          >
            <Text style={styles.buttonText}>
              {deleteMutation.isPending ? "Deleting..." : "Adopt"}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  );
};

export default PetItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f9e3be",
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  petInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "black",
    fontWeight: "300",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  petButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    marginBottom: 10,
  },
  adoptButton: {
    backgroundColor: "#f43f5e",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
