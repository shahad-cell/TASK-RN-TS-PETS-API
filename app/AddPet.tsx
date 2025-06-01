import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";

interface PetData {
  name: string;
  image: string;
  type: string;
  adopted: number;
}

const AddPet = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  const createPet = useMutation({
    mutationFn: (newPet: PetData) =>
      axios.post("https://pets-react-query-backend.eapi.joincoded.com/pets", newPet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      Alert.alert("Success", "Pet added successfully!");
      router.push("/");
    },
    onError: () => {
      Alert.alert("Error", "Failed to add pet.");
    },
  });

  const handleSubmit = () => {
    if (!name || !image || !type) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    createPet.mutate({ name, image, type, adopted: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet!</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Image" value={image} onChangeText={setImage} style={styles.input} />
      <TextInput placeholder="Type" value={type} onChangeText={setType} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={createPet.isPending}>
        <Text style={styles.buttonText}>
          {createPet.isPending ? "Submitting..." : "Add Pet"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
