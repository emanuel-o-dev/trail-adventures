import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ListItem } from "@rneui/themed";
import { useAsyncData } from "../hooks/useAsyncData";
import { ITrailDifficulty } from "../interfaces/ITrailDifficulty";
import TrailRepository from "../src/database/TrailRepository";

type ListItemAcordionProps = {
  value: ITrailDifficulty | null;
  onChange: (difficulty: ITrailDifficulty) => void;
};
export default function ListItemAcordion({
  value,
  onChange,
}: ListItemAcordionProps) {
  const [expanded, setExpanded] = React.useState(false);

  const { data, loading } = useAsyncData<{ data: ITrailDifficulty[] }>(
    async () => {
      const repository = new TrailRepository();
      const data = repository.getDifficulties();
      return { data };
    },
  );

  if (loading || !data) return null;

  return (
    <View>
      <ListItem.Accordion
        icon={{ name: "expand-more", color: "white" }}
        containerStyle={styles.accordionContainer}
        content={
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              Dificuldade
              <Text style={styles.selected}>
                {value ? ` - ${value.label}` : ""}
              </Text>
            </ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {data.map((difficulty) => (
          <ListItem
            key={difficulty.seq}
            onPress={() => {
              onChange(difficulty);
              setExpanded(false);
            }}
            containerStyle={styles.item}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>
                {difficulty.label}
              </ListItem.Title>
            </ListItem.Content>
            {value?.seq === difficulty.seq && (
              <ListItem.CheckBox checked checkedColor="green" />
            )}
          </ListItem>
        ))}
      </ListItem.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 10,
    backgroundColor: "#121416",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  title: {
    color: "#9EADB7",
    fontWeight: "bold",
  },
  selected: {
    color: "white",
    fontWeight: "normal",
  },
  item: {
    backgroundColor: "#121416",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: "white",
  },
  itemTitle: {
    color: "white",
  },
});
