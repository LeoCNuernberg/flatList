import { Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function CardFilme({ item }: { item: any }) {
  return (
    <Link href={`/components/filme/${item.id}`}>
      <Image
        source={{ uri: item.imagem }}
        style={styles.filme}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  filme: {
    width: 100,
    height: 140,
    borderRadius: 8,
    margin: 5,
    justifyContent: "flex-end",
    padding: 8,
  },
});