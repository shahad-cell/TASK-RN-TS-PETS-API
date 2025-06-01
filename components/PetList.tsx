import { useQuery } from "@tanstack/react-query";
import {
  ScrollView,
  Text,
  ActivityIndicator,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PetItem from "./PetItem";
import { fetchAllPets } from "@/api/pets";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const {
    data: pets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchAllPets,
  });

  if (isLoading) return <ActivityIndicator size="large" color="black" />;
  if (isError)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Failed to load pets.
        </Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ color: "blue", textAlign: "center" }}>Try again</Text>
        </TouchableOpacity>
      </View>
    );

  const filteredPets = (pets as any[])
    .filter((pet) => pet?.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((pet) => pet?.type?.toLowerCase().includes(type.toLowerCase()));

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearch}
        style={{
          backgroundColor: "white",
          marginBottom: 10,
          padding: 10,
          borderRadius: 10,
        }}
      />

      <ScrollView horizontal style={{ marginBottom: 10 }}>
        {["All", "Cat", "Dog", "Rabbit"].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setType(label === "All" ? "" : label)}
            style={{
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredPets
        .filter((pet) => pet && pet._id)
        .map((pet, index) => (
          <PetItem key={pet._id || index} pet={pet} />
        ))}
    </ScrollView>
  );
};

export default PetList;
