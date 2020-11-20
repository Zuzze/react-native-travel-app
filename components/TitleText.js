import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Fonts from "../constants/Fonts";

/** Default text used in title text of the app */
const TitleText = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

TitleText.propTypes = {
  style: PropTypes.object
};

TitleText.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.title,
    fontSize: 26,
    color: "white"
  }
});

export default TitleText;
