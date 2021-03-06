import React, { Component } from "react";
import { Linking, Platform } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 13;
`;

const Icon = styled.Image.attrs({
  source: require("../../assets/icons/document.png")
})``;

const Text = styled.Text`
  padding-left: 14;
  font-size: 12;
  color: rgb(0, 118, 255);
`;

class Document extends Component {
  openPdf = url => () => {
    const previewUrl =
      Platform.OS === "ios"
        ? url
        : `https://docs.google.com/gview?embedded=true&url=${url}`;
    Linking.canOpenURL(previewUrl).then(supported => {
      if (supported) {
        Linking.openURL(previewUrl);
      } else {
        // console.log(`Don't know how to open URI: ${previewUrl}`);
      }
    });
  };

  render() {
    const { editor, type, number, url } = this.props;
    return (
      <Wrapper onPress={this.openPdf(url)}>
        <Icon />
        <Text>{`${type} (${editor} ${number})`}</Text>
      </Wrapper>
    );
  }
}

Document.propTypes = {
  editor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Document;
