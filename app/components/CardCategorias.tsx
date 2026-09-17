import { View, Text, FlatList, StyleSheet } from "react-native";
import CardFilme from "./cardFilme.tsx";

export default function renderCategoria({ item }: { item: any }) {
  return (
    <View style={styles.categorias}>
      <Text style={styles.filmeTitulo}>{item.titulo}</Text>
      <FlatList
        data={item.filmes}
        keyExtractor={filme => filme.id}
        horizontal={true}
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => <CardFilme item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categorias: {
    color: "white",
    backgroundColor: '#000000'
  },
  filmeTitulo: {
    color: 'white',
    fontSize: 12
  }
});