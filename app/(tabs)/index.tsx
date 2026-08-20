import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
 
type Filme = {
  id: string;
  titulo: string;
  cor: string;
  imagem?: ImageSourcePropType;
};
type Categoria = { id: string; titulo: string; filmes: Filme[] };
 
const categorias: Categoria[] = [
  {
    id: "1",
    titulo: "Títulos",
    filmes: [
      {
        id: "1a",
        titulo: "1 Copa do Brasil",
        cor: "#fbff00",
        imagem: require("../../CopaDoBrasil.jfif"),
      },
      { id: "1b", titulo: "1 Série B", cor: "#fbff00" },
      { id: "1c", titulo: "1 Série C", cor: "#fbff00" },
      { id: "1d", titulo: "12 Campeonatos Catarinense", cor: "#fbff00" },
      { id: "1e", titulo: "2 Recopas Catarinense", cor: "#fbff00" },
    ],
  },
  {
    id: "2",
    titulo: "Próximos Jogos",
    filmes: [
      { id: "2a", titulo: "Criciúma x Fortaleza", cor: "#fbff00" },
      { id: "2b", titulo: "CRB X Criciúma", cor: "#fbff00" },
      { id: "2c", titulo: "Criciúma x Cuiabá", cor: "#fbff00" },
      { id: "2d", titulo: "Criciúma x Juventude", cor: "#fbff00" },
      { id: "2e", titulo: "Criciúma x Operário", cor: "#fbff00" },
    ],
  },
  {
    id: "3",
    titulo: "Idolos",
    filmes: [
      { id: "3a", titulo: "Jairo Lenzi", cor: "#fbff00" },
      { id: "3b", titulo: "Grizzo", cor: "#fbff00" },
      { id: "3c", titulo: "Itá", cor: "#fbff00" },
    ],
  },
  {
    id: "4",
    titulo: "Jogadores atuais",
    filmes: [
      { id: "4a", titulo: "Alisson", cor: "#fbff00" },
      { id: "4b", titulo: "Airton", cor: "#fbff00" },
      { id: "4c", titulo: "Pedro", cor: "#fbff00" },
      { id: "4a", titulo: "Rodrigo", cor: "#fbff00" },
      { id: "4b", titulo: "Castán", cor: "#fbff00" },
      { id: "4c", titulo: "César Martins", cor: "#fbff00" },
      { id: "4c", titulo: "Bruno Alves", cor: "#fbff00" },
      { id: "4a", titulo: "Octávio", cor: "#fbff00" },
      { id: "4b", titulo: "Ruan", cor: "#fbff00" },
      { id: "4a", titulo: "Willean Lepo", cor: "#fbff00" },
      { id: "4c", titulo: "Marcelo Hermes", cor: "#fbff00" },
      { id: "4a", titulo: "Marcinho", cor: "#fbff00" },
      { id: "4b", titulo: "Hiago", cor: "#fbff00" },
      { id: "4c", titulo: "Jean Irmer", cor: "#fbff00" },
      { id: "4a", titulo: "Thiaguinho", cor: "#fbff00" },
      { id: "4b", titulo: "Ronald", cor: "#fbff00" },
      { id: "4c", titulo: "Gui Lobo", cor: "#fbff00" },
      { id: "4b", titulo: "Eduardo", cor: "#fbff00" },
      { id: "4c", titulo: "Fellipe Mateus", cor: "#fbff00" },
      { id: "4a", titulo: "Jhonata Robert", cor: "#fbff00" },
      { id: "4b", titulo: "Otero", cor: "#fbff00" },
      { id: "4c", titulo: "Romarinho", cor: "#fbff00" },
      { id: "4a", titulo: "Waguininho", cor: "#fbff00" },
      { id: "4b", titulo: "Nicolas", cor: "#fbff00" },
      { id: "4c", titulo: "João Carlos", cor: "#fbff00" },
      { id: "4a", titulo: "Diego Gonçalves", cor: "#fbff00" },
      { id: "4b", titulo: "Cauê Santos", cor: "#fbff00" },
      { id: "4c", titulo: "Yuri Tanque", cor: "#fbff00" },
    ],
  },
  {
    id: "5",
    titulo: "Comissão Técnica",
    filmes: [
      { id: "5a", titulo: "Eduardo Baptista - Técnico", cor: "#fbff00" },
      { id: "5c", titulo: "Julio Cesar - Auxiliar Técnico", cor: "#fbff00" },
      { id: "5c", titulo: "Amauri Barasuol - Auxiliar Técnico", cor: "#fbff00" },
      { id: "5c", titulo: "Lucas Matheus - Auxiliar Técnico e Analista", cor: "#fbff00" },
      { id: "5b", titulo: "Thiago Gasparino - Executivo de Futebol", cor: "#fbff00" },
      
    ],
  },
];
 
function FilmeCardBase({
  item,
  style,
  titulo,
  tituloStyle,
  children,
}: {
  item: Filme;
  style: object;
  titulo: string;
  tituloStyle?: object;
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
        <Image
          source={
            item.imagem ??
            require("../../Fotos Projeto/Logo informacao carvoeira.png")
          }
          style={styles.filmeImagem}
          resizeMode="cover"
        />
        <Animated.View
          style={[
            styles.tituloOverlay,
            { opacity: hoverProgress },
          ]}
        >
          <Text style={[styles.filmeTitulo, tituloStyle]}>{titulo}</Text>
        </Animated.View>
        {children}
      </Animated.View>
    </Pressable>
  );
}

function FilmeCard({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      style={[styles.filmeCard, { backgroundColor: item.cor }]}
    >
      <View />
    </FilmeCardBase>
  );
}
 
function FilmeCardDestaque({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      style={[styles.filmeCardDestaque, { backgroundColor: item.cor }]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>🔥 Destaque</Text>
      </View>
    </FilmeCardBase>
  );
}
 
function FilmeCardBanner({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      tituloStyle={styles.filmeTituloCentralizado}
      style={[styles.filmeCardBanner, { backgroundColor: item.cor }]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>✨ Novo</Text>
      </View>
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
          source={require("../../Fotos Projeto/Logo informacao carvoeira.png")}
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
  filmeImagem: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 6,
  },
  tituloOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
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
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
});
 
 