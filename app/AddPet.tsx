import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddPet = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.post("https://pets-react-query-backend.eapi.joincoded.com/pets", {
        name,
        type,
        image,
        adopted: 0,
      }),
    onSuccess: () => {
      Alert.alert("✅ Success", "Pet added successfully!");
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      setName("");
      setType("");
      setImage("");
    },
    onError: () => {
      Alert.alert("❌ Error", "Something went wrong while adding the pet.");
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet!</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => mutate()} disabled={isPending}>
        <Text style={styles.buttonText}>
          {isPending ? "Submitting..." : "Add Pet"}
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
