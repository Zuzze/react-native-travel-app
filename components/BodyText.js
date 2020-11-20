import React from "react";
import { Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";
import Fonts from "../constants/Fonts";

/** Default text used in title text of the app */
const BodyText = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

BodyText.propTypes = {
  style: PropTypes.object
};

BodyText.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.body,
    fontSize: 20,
    color: "white"
  }
});

export default BodyText;
