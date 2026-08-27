import { useRef, type ReactNode } from "react";
import { useRouter } from "expo-router";

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
  imagem: ImageSourcePropType;
};

type Categoria = {
  id: string;
  titulo: string;
  filmes: Filme[];
};

const categorias: Categoria[] = [
  {
    id: "1",
    titulo: "Populares na Netflix",
    filmes: [
      {
        id: "1a",
        titulo: "Stranger Things",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        },
      },
      {
        id: "1b",
        titulo: "Round 6",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        },
      },
      {
        id: "1c",
        titulo: "La Casa de Papel",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        },
      },
      {
        id: "1d",
        titulo: "Wandinha",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        },
      },
      {
        id: "1e",
        titulo: "Dark",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
        },
      },
    ],
  },

  

  {
    id: "2",
    titulo: "Filmes de Ação",
    filmes: [
      {
        id: "2a",
        titulo: "Resgate",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg",
        },
      },
      {
        id: "2b",
        titulo: "Alerta Vermelho",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
        },
      },
      {
        id: "2c",
        titulo: "O Projeto Adam",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/11MJy6lkt7yTEIowEPIkaK4B7lM.jpg",
        },
      },
      {
        id: "2d",
        titulo: "Agente Oculto",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/1f10KUKW7KyNt8bF8NHmwbBQ9fs.jpg",
        },
      },
      {
        id: "2e",
        titulo: "Esquadrão 6",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg",
        },
      },
    ],
  },

  {
    id: "3",
    titulo: "Séries para Maratonar",
    filmes: [
      {
        id: "3a",
        titulo: "Breaking Bad",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        },
      },
      {
        id: "3b",
        titulo: "Peaky Blinders",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        },
      },
      {
        id: "3c",
        titulo: "The Witcher",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
        },
      },
      {
        id: "3d",
        titulo: "Lucifer",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
        },
      },
      {
        id: "3e",
        titulo: "Cobra Kai",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/6POBWybSBDBKjSs1VAQcnQC1qyt.jpg",
        },
      },
    ],
  },

  {
    id: "4",
    titulo: "Comédia",
    filmes: [
      {
        id: "4a",
        titulo: "Mistério no Mediterrâneo",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/5G9QHrLg16qF6K9CHLmP4tL8vXw.jpg",
        },
      },
      {
        id: "4b",
        titulo: "Não Olhe para Cima",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/6Sc7Tjt7aPsdghYK32mDMFeZkqJ.jpg",
        },
      },
      {
        id: "4c",
        titulo: "Mistério em Paris",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/5x1R4gvsYyd6lyoUcT4vNkqzYV6.jpg",
        },
      },
      {
        id: "4d",
        titulo: "Family Switch",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/fnRUCA0fjEb3kuIaTGogL7425IC.jpg",
        },
      },
      {
        id: "4e",
        titulo: "Certas Pessoas",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/x5E4TndwASNkaK2hwgeYfsIVo2x.jpg",
        },
      },
    ],
  },

  {
    id: "5",
    titulo: "Suspense e Terror",
    filmes: [
      {
        id: "5a",
        titulo: "Bird Box",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg",
        },
      },
      {
        id: "5b",
        titulo: "Rua do Medo",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/9J9Wy39ZjrVmfk7yMkulpcI5sy0.jpg",
        },
      },
      {
        id: "5c",
        titulo: "O Telefone do Sr. Harrigan",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/rX42wwlcowm5kGEMs7P5lq2b0Kp.jpg",
        },
      },
      {
        id: "5d",
        titulo: "Jogo Perigoso",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/32dippiypDdaKv7XFEfUlQ7kPup.jpg",
        },
      },
      {
        id: "5e",
        titulo: "O Poço",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/8ZX18L5m6rH5viSYpRnTSbb9eXh.jpg",
        },
      },
    ],
  },

  {
    id: "6",
    titulo: "Minha Lista",
    filmes: [
      {
        id: "6a",
        titulo: "Stranger Things",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        },
      },
      {
        id: "6b",
        titulo: "Breaking Bad",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        },
      },
      {
        id: "6c",
        titulo: "Dark",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
        },
      },
      {
        id: "6d",
        titulo: "Peaky Blinders",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        },
      },
      {
        id: "6e",
        titulo: "Wandinha",
        cor: "#E50914",
        imagem: {
          uri: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        },
      },
    ],
  },
];

function FilmeCardBase({
  item,
  style,
  titulo,
  children,
}: {
  item: Filme;
  style: object;
  titulo: string;
  children?: ReactNode;
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

function FilmeCard({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
      style={[
        styles.filmeCard,
        {
          backgroundColor: item.cor,
        },
      ]}
    />
  );
}

function FilmeCardDestaque({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
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

function FilmeCardNovo({ item }: { item: Filme }) {
  return (
    <FilmeCardBase
      item={item}
      titulo={item.titulo}
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

function renderFilmeCard(item: Filme, index: number) {
  if (index === 0) {
    return <FilmeCardDestaque item={item} />;
  }

  if (index === 1) {
    return <FilmeCardNovo item={item} />;
  }

  return <FilmeCard item={item} />;
}

function CategoriaRow({ item }: { item: Categoria }) {
  return (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaTitulo}>
        {item.titulo}
      </Text>

      <FlatList
        data={item.filmes}
        keyExtractor={(filme) => filme.id}
        renderItem={({ item: filme, index }) =>
          renderFilmeCard(filme, index)
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaHorizontal}
      />
    </View>
  );
}

export default function Netflix() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Image
          source={require("../../Fotos Projeto/netflix-logo.png")}
          style={styles.netflixLogo}
          resizeMode="contain"
        />

        <View style={styles.menu}>

          <Text style={styles.menuAtivo}>
            Início
          </Text>

          <Text style={styles.menuItem}>
            Séries
          </Text>

          <Text style={styles.menuItem}>
            Filmes
          </Text>

          <Text style={styles.menuItem}>
            Minha lista
          </Text>

        </View>

      </View>

      <FlatList
        data={categorias}
        keyExtractor={(categoria) => categoria.id}
        renderItem={({ item }) => (
          <CategoriaRow item={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
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
});