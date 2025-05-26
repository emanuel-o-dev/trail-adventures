import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input } from "@rneui/themed";

type InputFormProps = {
  placeholder: string;
  label: string;
  multiline: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

export default function InputForm(inputProps: InputFormProps) {
  return (
    <View>
      <Input
        placeholder={inputProps.placeholder}
        placeholderTextColor={"#9EADB7"}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        label={inputProps.label}
        labelStyle={styles.inputLabel}
        inputStyle={{
          ...styles.input,
          ...(inputProps.multiline ? styles.inputMultiline : {}),
        }}
        multiline={inputProps.multiline}
        maxLength={200}
        numberOfLines={inputProps.multiline ? 4 : 1}
        value={inputProps.value}
        onChangeText={inputProps.onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    paddingHorizontal: 10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
