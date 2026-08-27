import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

export default function FilmeDetalhes() {
  const router = useRouter();

  const {
    titulo,
    imagem,
    sinopse,
  } = useLocalSearchParams<{
    titulo: string;
    imagem: string;
    sinopse: string;
  }>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.netflixLogo}>
          NETFLIX
        </Text>

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoVoltar}>
            ← Voltar
          </Text>
        </Pressable>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: imagem }}
            style={styles.poster}
            resizeMode="cover"
          />
        </View>

        <View style={styles.informacoes}>
          <Text style={styles.originalNetflix}>
            N SÉRIE / FILME
          </Text>

          <Text style={styles.titulo}>
            {titulo}
          </Text>

          <View style={styles.dados}>
            <Text style={styles.relevancia}>
              98% relevante
            </Text>

            <Text style={styles.ano}>
              2026
            </Text>

            <View style={styles.classificacao}>
              <Text style={styles.classificacaoTexto}>
                16
              </Text>
            </View>

            <Text style={styles.qualidade}>
              HD
            </Text>
          </View>

          <Text style={styles.sinopse}>
            {sinopse}
          </Text>

          <View style={styles.botoes}>
            <Pressable style={styles.botaoAssistir}>
              <Text style={styles.play}>
                ▶
              </Text>

              <Text style={styles.textoAssistir}>
                Assistir
              </Text>
            </Pressable>

            <Pressable style={styles.botaoMinhaLista}>
              <Text style={styles.mais}>
                +
              </Text>

              <Text style={styles.textoMinhaLista}>
                Minha lista
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },

  scrollContent: {
    minHeight: "100%",
    paddingBottom: 50,
  },

  header: {
    width: "100%",

    paddingHorizontal: 40,
    paddingVertical: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#0b0b0b",
  },

  netflixLogo: {
    color: "#E50914",

    fontSize: 32,
    fontWeight: "900",

    letterSpacing: -2,
  },

  botaoVoltar: {
    backgroundColor: "#333333",

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 5,
  },

  textoVoltar: {
    color: "#ffffff",

    fontSize: 14,
    fontWeight: "600",
  },

  conteudo: {
    width: "100%",

    flexDirection: "row",
    flexWrap: "wrap",

    paddingHorizontal: 60,
    paddingTop: 60,

    gap: 60,

    alignItems: "center",
    justifyContent: "center",
  },

  posterContainer: {
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.7,
    shadowRadius: 20,

    elevation: 10,
  },

  poster: {
    width: 330,
    height: 500,

    borderRadius: 8,

    backgroundColor: "#222",
  },

  informacoes: {
    flex: 1,

    minWidth: 280,
    maxWidth: 650,
  },

  originalNetflix: {
    color: "#b3b3b3",

    fontSize: 13,
    fontWeight: "700",

    letterSpacing: 3,

    marginBottom: 12,
  },

  titulo: {
    color: "#ffffff",

    fontSize: 48,
    fontWeight: "900",

    marginBottom: 20,
  },

  dados: {
    flexDirection: "row",
    alignItems: "center",

    flexWrap: "wrap",

    gap: 12,

    marginBottom: 25,
  },

  relevancia: {
    color: "#46d369",

    fontSize: 15,
    fontWeight: "700",
  },

  ano: {
    color: "#b3b3b3",

    fontSize: 15,
  },

  classificacao: {
    backgroundColor: "#e67e22",

    width: 28,
    height: 28,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 3,
  },

  classificacaoTexto: {
    color: "#ffffff",

    fontWeight: "900",
  },

  qualidade: {
    color: "#ffffff",

    fontSize: 11,

    borderWidth: 1,
    borderColor: "#777",

    paddingHorizontal: 5,
    paddingVertical: 2,

    borderRadius: 2,
  },

  sinopse: {
    color: "#e5e5e5",

    fontSize: 18,
    lineHeight: 29,

    marginBottom: 35,
  },

  botoes: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 12,
  },

  botaoAssistir: {
    backgroundColor: "#ffffff",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 25,
    paddingVertical: 13,

    borderRadius: 5,
  },

  play: {
    color: "#000",

    fontSize: 18,

    marginRight: 10,
  },

  textoAssistir: {
    color: "#000",

    fontSize: 16,
    fontWeight: "700",
  },

  botaoMinhaLista: {
    backgroundColor: "#333333",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 22,
    paddingVertical: 13,

    borderRadius: 5,
  },

  mais: {
    color: "#ffffff",

    fontSize: 24,

    marginRight: 10,
  },

  textoMinhaLista: {
    color: "#ffffff",

    fontSize: 16,
    fontWeight: "600",
  },
});