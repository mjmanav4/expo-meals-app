import React, { useState } from "react";
import { Platform } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/color";

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
