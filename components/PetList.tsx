import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPets } from "@/api/pets";
import PetItem from "./PetItem";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const { data: pets = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
  });

  if (isLoading) return <ActivityIndicator size="large" color="black" />;
  if (isError) return <Text>Error loading pets. <Text onPress={refetch}>Try again</Text></Text>;

  const filteredPets = pets
    .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase()));

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.containerStyle}>
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />

      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        {["", "Cat", "Dog", "Rabbit"].map((t) => (
          <TouchableOpacity key={t} style={styles.filterButton} onPress={() => setType(t)}>
            <Text>{t === "" ? "All" : t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredPets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
