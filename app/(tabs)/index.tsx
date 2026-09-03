import { useRef, useState, type ReactNode } from "react";
import categorias from "../components/DadosDosFilmes";

import {
  Animated,
  FlatList,
  Image,
  Modal,
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
  imagem: ImageSourcePropType;
};

type Categoria = {
  id: string;
  titulo: string;
  filmes: Filme[];
};


function FilmeCardBase({
  item,
  style,
  titulo,
  children,
  onPress,
}: {
  item: Filme;
  style: object;
  titulo: string;
  children?: ReactNode;
  onPress: () => void;
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
      onPress={onPress}
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
                  outputRange: [1, 1.07],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={item.imagem}
          style={styles.filmeImagem}
          resizeMode="cover"
        />

        <Animated.View
          style={[
            styles.tituloOverlay,
            {
              opacity: hoverProgress,
            },
          ]}
        >
          <Text style={styles.filmeTitulo}>
            {titulo}
          </Text>

          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </Animated.View>

        {children}
      </Animated.View>
    </Pressable>
  );
}

function FilmeCard({ item, onPress }: { item: Filme; onPress: () => void }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      onPress={onPress}
      style={[
        styles.filmeCard,
        {
          backgroundColor: item.cor,
        },
      ]}
    />
  );
}

function FilmeCardDestaque({ item, onPress }: { item: Filme; onPress: () => void }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      onPress={onPress}
      style={[
        styles.filmeCard,
        {
          backgroundColor: item.cor,
        },
      ]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeTexto}>
          TOP 10
        </Text>
      </View>
    </FilmeCardBase>
  );
}

function FilmeCardNovo({ item, onPress }: { item: Filme; onPress: () => void }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      onPress={onPress}
      style={[
        styles.filmeCard,
        {
          backgroundColor: item.cor,
        },
      ]}
    >
      <View style={styles.badgeNovo}>
        <Text style={styles.badgeTexto}>
          NOVO
        </Text>
      </View>
    </FilmeCardBase>
  );
}

function renderFilmeCard(
  item: Filme,
  index: number,
  onPress: (filme: Filme) => void
) {
  if (index === 0) {
    return <FilmeCardDestaque item={item} onPress={() => onPress(item)} />;
  }

  if (index === 1) {
    return <FilmeCardNovo item={item} onPress={() => onPress(item)} />;
  }

  return <FilmeCard item={item} onPress={() => onPress(item)} />;
}

function CategoriaRow({
  item,
  onFilmePress,
}: {
  item: Categoria;
  onFilmePress: (filme: Filme) => void;
}) {
  return (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaTitulo}>
        {item.titulo}
      </Text>

      <FlatList
        data={item.filmes}
        keyExtractor={(filme) => filme.id}
        renderItem={({ item: filme, index }) =>
          renderFilmeCard(filme, index, onFilmePress)
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaHorizontal}
      />
    </View>
  );
}

export default function Netflix() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../Fotos Projeto/netflix-logo.png")}
          style={styles.netflixLogo}
          resizeMode="contain"
        />

        <View style={styles.menu}>
          <Text style={styles.menuAtivo}>Início</Text>
          <Text style={styles.menuItem}>Séries</Text>
          <Text style={styles.menuItem}>Filmes</Text>
          <Text style={styles.menuItem}>Minha lista</Text>
        </View>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={(categoria) => categoria.id}
        renderItem={({ item }) => (
          <CategoriaRow
            item={item}
            onFilmePress={setFilmeSelecionado}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      />

      <Modal
        visible={filmeSelecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setFilmeSelecionado(null)}
      >
        <Pressable
          style={styles.modalFundo}
          onPress={() => setFilmeSelecionado(null)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              style={styles.fecharButton}
              onPress={() => setFilmeSelecionado(null)}
            >
              <Text style={styles.fecharTexto}>✕</Text>
            </Pressable>

            {filmeSelecionado && (
              <>
                <Image
                  source={filmeSelecionado.imagem}
                  style={styles.modalImagem}
                  resizeMode="cover"
                />

                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitulo}>
                    {filmeSelecionado.titulo}
                  </Text>

                  <View style={styles.modalMeta}>
                    <Text style={styles.modalRelevancia}>98% relevante</Text>
                    <Text style={styles.modalAno}>2026</Text>
                    <Text style={styles.modalClassificacao}>16</Text>
                  </View>
                  <Pressable style={styles.assistirButton}>
                    <Text style={styles.assistirIcon}>▶</Text>
                    <Text style={styles.assistirTexto}>Assistir</Text>
                  </Pressable>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#141414",
  },

  netflixLogo: {
    width: 150,
    height: 50,

    marginRight: 35,
  },

  menu: {
    flexDirection: "row",
    alignItems: "center",

    gap: 22,
  },

  menuAtivo: {
    color: "#ffffff",

    fontSize: 14,
    fontWeight: "700",
  },

  menuItem: {
    color: "#b3b3b3",

    fontSize: 14,
    fontWeight: "500",
  },

  conteudo: {
    paddingTop: 12,
    paddingBottom: 80,
  },

  categoriaContainer: {
    marginBottom: 32,
    paddingLeft: 20,
  },

  categoriaTitulo: {
    color: "#ffffff",

    fontSize: 20,
    fontWeight: "700",

    marginBottom: 12,
  },

  listaHorizontal: {
    paddingRight: 20,
  },

  filmePressable: {
    marginRight: 12,
  },

  filmeCard: {
    width: 140,
    height: 200,

    borderRadius: 6,

    overflow: "hidden",

    backgroundColor: "#222222",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.4,
    shadowRadius: 5,

    elevation: 5,
  },

  filmeImagem: {
    ...StyleSheet.absoluteFillObject,

    width: undefined,
    height: undefined,
  },

  tituloOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(0, 0, 0, 0.72)",

    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },

  filmeTitulo: {
    color: "#ffffff",

    fontSize: 14,
    fontWeight: "700",

    textAlign: "center",

    marginBottom: 12,
  },

  playButton: {
    width: 35,
    height: 35,

    borderRadius: 20,

    backgroundColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center",
  },

  playIcon: {
    color: "#000000",

    fontSize: 15,

    marginLeft: 2,
  },

  badge: {
    position: "absolute",

    top: 8,
    right: 8,

    backgroundColor: "#E50914",

    borderRadius: 3,

    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  badgeNovo: {
    position: "absolute",

    top: 8,
    right: 8,

    backgroundColor: "#E50914",

    borderRadius: 3,

    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  badgeTexto: {
    color: "#ffffff",

    fontSize: 9,
    fontWeight: "900",
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.82)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalCard: {
    width: "90%",
    maxWidth: 900,
    minHeight: 460,
    backgroundColor: "#181818",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },

  modalImagem: {
    width: "42%",
    minHeight: 460,
  },

  modalInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 52,
    justifyContent: "center",
  },

  modalTitulo: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 14,
  },

  modalMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },

  modalRelevancia: {
    color: "#46d369",
    fontSize: 14,
    fontWeight: "700",
  },

  modalAno: {
    color: "#d2d2d2",
    fontSize: 14,
  },

  modalClassificacao: {
    color: "#ffffff",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#777777",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
assistirButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 11,
    gap: 9,
  },

  assistirIcon: {
    color: "#000000",
    fontSize: 16,
  },

  assistirTexto: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
  },

  fecharButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  fecharTexto: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

});