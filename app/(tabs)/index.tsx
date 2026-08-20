import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
 
type Filme = { id: string; titulo: string; cor: string };
type Categoria = { id: string; titulo: string; filmes: Filme[] };
 
const categorias: Categoria[] = [
  {
    id: "1",
    titulo: "Títulos",
    filmes: [
      { id: "1a", titulo: "1 Copa do Brasil", cor: "#fbff00" },
      { id: "1b", titulo: "1 Série B", cor: "#fbff00" },
      { id: "1c", titulo: "1 Série C", cor: "#fbff00" },
      { id: "1d", titulo: "12 Campeonatos Catarinense", cor: "#fbff00" },
      { id: "1e", titulo: "2 Recopas Catarinense", cor: "#fbff00" },
    ],
  },
  {
    id: "2",
    titulo: "Ação",
    filmes: [
      { id: "2a", titulo: "John Wick 4", cor: "#fbff00" },
      { id: "2b", titulo: "Missão Impossível", cor: "#fbff00" },
      { id: "2c", titulo: "Top Gun", cor: "#fbff00" },
      { id: "2d", titulo: "Mad Max", cor: "#fbff00" },
    ],
  },
  {
    id: "3",
    titulo: "Comédia",
    filmes: [
      { id: "3a", titulo: "Superbad", cor: "#fbff00" },
      { id: "3b", titulo: "The Grand Budapest", cor: "#fbff00" },
      { id: "3c", titulo: "Knives Out", cor: "#fbff00" },
    ],
  },
  {
    id: "4",
    titulo: "Documentários",
    filmes: [
      { id: "4a", titulo: "Free Solo", cor: "#fbff00" },
      { id: "4b", titulo: "The Social Dilemma", cor: "#fbff00" },
      { id: "4c", titulo: "My Octopus Teacher", cor: "#fbff00" },
    ],
  },
  {
    id: "5",
    titulo: "Terror",
    filmes: [
      { id: "5a", titulo: "Hereditary", cor: "#fbff00" },
      { id: "5b", titulo: "Midsommar", cor: "#fbff00" },
      { id: "5c", titulo: "Get Out", cor: "#fbff00" },
    ],
  },
 
  {
    id: "1",
    titulo: "Em Alta",
    filmes: [
      { id: "1a", titulo: "Oppenheimer", cor: "#fbff00" },
      { id: "1b", titulo: "Duna 2", cor: "#fbff00" },
      { id: "1c", titulo: "Barbie", cor: "#fbff00" },
      { id: "1d", titulo: "Poor Things", cor: "#fbff00" },
      { id: "1e", titulo: "Saltburn", cor: "#fbff00" },
    ],
  },
  {
    id: "2",
    titulo: "Ação",
    filmes: [
      { id: "2a", titulo: "John Wick 4", cor: "#fbff00" },
      { id: "2b", titulo: "Missão Impossível", cor: "#fbff00" },
      { id: "2c", titulo: "Top Gun", cor: "#fbff00" },
      { id: "2d", titulo: "Mad Max", cor: "#fbff00" },
    ],
  },
  {
    id: "3",
    titulo: "Comédia",
    filmes: [
      { id: "3a", titulo: "Superbad", cor: "#fbff00" },
      { id: "3b", titulo: "The Grand Budapest", cor: "#fbff00" },
      { id: "3c", titulo: "Knives Out", cor: "#fbff00" },
    ],
  },
  {
    id: "4",
    titulo: "Documentários",
    filmes: [
      { id: "4a", titulo: "Free Solo", cor: "#fbff00" },
      { id: "4b", titulo: "The Social Dilemma", cor: "#fbff00" },
      { id: "4c", titulo: "My Octopus Teacher", cor: "#fbff00" },
    ],
  },
  {
    id: "5",
    titulo: "Terror",
    filmes: [
      { id: "5a", titulo: "Hereditary", cor: "#fbff00" },
      { id: "5b", titulo: "Midsommar", cor: "#fbff00" },
      { id: "5c", titulo: "Get Out", cor: "#fbff00" },
    ],
  },
];
 
function FilmeCardBase({
  item,
  style,
  children,
}: {
  item: Filme;
  style: object;
  children: React.ReactNode;
}) {
  const hoverProgress = useRef(new Animated.Value(0)).current;

  const animateHover = (toValue: number) => {
    Animated.timing(hoverProgress, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onHoverIn={() => animateHover(1)}
      onHoverOut={() => animateHover(0)}
      style={styles.filmePressable}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [
              {
                scale: hoverProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.06],
                }),
              },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

function FilmeCard({ item }: { item: Filme }) {
  return (
    <FilmeCardBase item={item} style={[styles.filmeCard, { backgroundColor: item.cor }]}>
      <Text style={styles.filmeTitulo}>{item.titulo}</Text>
    </FilmeCardBase>
  );
}
 
function FilmeCardDestaque({ item }: { item: Filme }) {
  return (
    <FilmeCardBase item={item} style={[styles.filmeCardDestaque, { backgroundColor: item.cor }]}>
      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>🔥 Destaque</Text>
      </View>
      <Text style={styles.filmeTitulo}>{item.titulo}</Text>
    </FilmeCardBase>
  );
}
 
function FilmeCardBanner({ item }: { item: Filme }) {
  return (
    <FilmeCardBase item={item} style={[styles.filmeCardBanner, { backgroundColor: item.cor }]}>
      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>✨ Novo</Text>
      </View>
      <Text style={[styles.filmeTitulo, styles.filmeTituloCentralizado]}>
        {item.titulo}
      </Text>
    </FilmeCardBase>
  );
}
 
function renderFilmeCard(item: Filme) {
  switch (item.cor) {
    case "red":
      return <FilmeCardDestaque item={item} />;
    case "green":
      return <FilmeCardBanner item={item} />;
    default:
      return <FilmeCard item={item} />;
  }
}
 
function CategoriaRow({ item }: { item: Categoria }) {
  return (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaTitulo}>{item.titulo}</Text>
      <FlatList
        data={item.filmes}
        keyExtractor={(filme) => filme.id}
        renderItem={({ item: filme }) => renderFilmeCard(filme)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
 
export default function Netflix() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logoImagem}
          resizeMode="contain"
          accessibilityLabel="Logo Informação Carvoeira"
        />
      </View>
      <FlatList
        data={categorias}
        keyExtractor={(cat) => cat.id}
        renderItem={({ item }) => <CategoriaRow item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoImagem: {
    width: 180,
    height: 56,
  },
  categoriaContainer: {
    marginBottom: 24,
    paddingLeft: 12,
  },
  categoriaTitulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    borderLeftWidth: 3,
    borderLeftColor: "#000000",
    paddingLeft: 8,
    marginBottom: 10,
  },
  filmePressable: {
    marginRight: 10,
  },
  filmeCard: {
    width: 120,
    height: 170,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  filmeCardDestaque: {
    width: 120,
    height: 170,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  filmeCardBanner: {
    width: 200,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  badgeTexto: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
  filmeTituloCentralizado: {
    textAlign: "center",
  },
  filmeTitulo: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
});
 
 