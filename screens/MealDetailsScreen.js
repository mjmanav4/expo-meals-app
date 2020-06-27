import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = props => {
  const availableMeals = useSelector(state => state.meals.meal);
  const mealId = props.navigation.getParam("mealId");

  const isFavourite = useSelector(state =>
    state.meals.filteredMeals.some(meal => meal.id == mealId)
  );
  const selectedMeal = availableMeals.find(meal => meal.id == mealId);
  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [selectedMeal]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isFavourite });
  }, [isFavourite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ing => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}
      <Text style={styles.title}>steps</Text>
      {selectedMeal.steps.map(s => (
        <ListItem key={s}>{s}</ListItem>
      ))}
    </ScrollView>
  );
};
MealDetailsScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFav = navigationData.navigation.getParam("isFav");
  const toggleFav = navigationData.navigation.getParam("toggleFav");

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={() => {
            toggleFav();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc"
  }
});

export default MealDetailsScreen;
