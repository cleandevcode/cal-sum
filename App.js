import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";

const foodLists = [
  {
    id: 0,
    name: "Egg",
    cal: 79,
    type: "1 medium (1.9 oz)",
    selected: false,
  },
  {
    id: 1,
    name: "Egg, scrambled",
    cal: 149,
    type: "1 Serving (3.5 oz)",
    selected: false,
  },
  {
    id: 2,
    name: "Egg omelet",
    cal: 154,
    type: "1 Serving (3.5 oz)",
    selected: false,
  },
];

export default function App() {
  const [selectedItems, setItems] = useState(foodLists);
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (selectedItems.length > 0)
      setSum(
        selectedItems
          .filter((e) => e.selected === true)
          .map((item) => item.cal)
          .reduce(function (prev, next) {
            return prev + next;
          }, 0)
      );
  }, [selectedItems]);

  const renderItem = (row) => {
    const { item, index } = row;
    return (
      <TouchableOpacity
        key={index}
        style={styles.cardContainer}
        onPress={() => handleSelect(item, index)}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>
            {item.cal} cal · {item.type}
          </Text>
        </View>
        {item.selected ? (
          <FontAwesome name="check" size={24} color="#6cff00" />
        ) : (
          <FontAwesome name="plus" size={24} color="#008dff" />
        )}
      </TouchableOpacity>
    );
  };

  const handleSum = () => {
    setShow(true);
  };

  const handleSelect = (item, index) => {
    let temp = selectedItems;
    item.selected = !item.selected;
    temp[index] = item;
    setItems([...temp]);
  };

  const onDismissSnackBar = () => setShow(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={foodLists}
        extraData={selectedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.w100}
      />
      <TouchableOpacity style={styles.sum} onPress={handleSum}>
        <Text style={{ color: "white" }}>Calculate</Text>
      </TouchableOpacity>
      <Snackbar
        visible={show}
        duration={1000}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Ok",
          onPress: () => {
            setShow(false);
          },
        }}
      >
        <Text> Total: {sum} cal</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    paddingTop: 50,
  },
  cardContainer: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: 10,
  },
  desc: {
    fontSize: 12,
    color: "grey",
    marginBottom: 5,
  },
  w100: {
    width: "100%",
  },
  sum: {
    backgroundColor: "#0d5eda",
    borderRadius: 30,
    height: 40,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
