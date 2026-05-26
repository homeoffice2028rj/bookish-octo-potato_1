import { useContext, useMemo, useState } from "react";
import { Image } from "expo-image";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { CarrinhoContext } from "@/src/context/carrinhoContext";

const produtos = [
  {
    id: 1,
    nome: "X-Burger da Casa",
    categoria: "Lanches",
    descricao: "Hambúrguer artesanal, queijo, alface, tomate e molho especial.",
    preco: 18,
    destaque: "Mais pedido",
    imagem: require("../../assets/products/x-burger.jpeg"),
  },
  {
    id: 2,
    nome: "X-Bacon Crocante",
    categoria: "Lanches",
    descricao: "Carne suculenta, bacon, cheddar e maionese verde.",
    preco: 24,
    destaque: "Especial",
    imagem: require("../../assets/products/x-bacon.png"),
  },
  {
    id: 3,
    nome: "Batata Frita",
    categoria: "Porções",
    descricao: "Batata sequinha com sal da casa. Ideal para dividir.",
    preco: 12,
    destaque: "Crocante",
    imagem: require("../../assets/products/batata.png"),
  },
  {
    id: 4,
    nome: "Combo Universitário",
    categoria: "Combos",
    descricao: "X-Burger, batata pequena e refrigerante lata.",
    preco: 31,
    destaque: "Econômico",
    imagem: require("../../assets/products/combo.png"),
  },
  {
    id: 5,
    nome: "X-Salada Especial",
    categoria: "Lanches",
    descricao: "Hambúrguer, queijo, alface, tomate, milho e molho da casa.",
    preco: 21,
    destaque: "Clássico",
    imagem: require("../../assets/products/x-salada.png"),
  },
  {
    id: 6,
    nome: "Smash Duplo",
    categoria: "Lanches",
    descricao: "Dois smash burgers, cheddar cremoso, picles e molho especial.",
    preco: 29,
    destaque: "Duplo",
    imagem: require("../../assets/products/smash-duplo.png"),
  },
  {
    id: 7,
    nome: "Frango Crispy",
    categoria: "Lanches",
    descricao: "Frango empanado crocante, queijo, alface e maionese temperada.",
    preco: 23,
    destaque: "Crocante",
    imagem: require("../../assets/products/frango-crispy.png"),
  },
  {
    id: 8,
    nome: "Onion Rings",
    categoria: "Porções",
    descricao: "Anéis de cebola crocantes com molho especial da casa.",
    preco: 16,
    destaque: "Porção",
    imagem: require("../../assets/products/onion-rings.png"),
  },
  {
    id: 9,
    nome: "Combo Smash",
    categoria: "Combos",
    descricao: "Smash duplo, fritas médias e refrigerante lata.",
    preco: 39,
    destaque: "Completo",
    imagem: require("../../assets/products/combo-smash.png"),
  },
  {
    id: 10,
    nome: "Combo Família",
    categoria: "Combos",
    descricao: "Dois lanches, batata grande e duas bebidas.",
    preco: 69,
    destaque: "Família",
    imagem: require("../../assets/products/combo-familia.png"),
  },
  {
    id: 11,
    nome: "Refrigerante Lata",
    categoria: "Bebidas",
    descricao: "Lata gelada 350 ml. Escolha o sabor no atendimento.",
    preco: 7,
    destaque: "Gelado",
    imagem: require("../../assets/products/refrigerante.png"),
  },
  {
    id: 12,
    nome: "Suco Natural",
    categoria: "Bebidas",
    descricao: "Feito na hora com fruta fresca.",
    preco: 10,
    destaque: "Natural",
    imagem: require("../../assets/products/suco.png"),
  },
  {
    id: 13,
    nome: "Cerveja Zero Grau",
    categoria: "Bebidas",
    descricao: "Long neck trincando, perfeita para acompanhar os combos.",
    preco: 12,
    destaque: "Trincando",
    imagem: require("../../assets/products/cerveja-zero-grau.png"),
  },
  {
    id: 14,
    nome: "Cerveja Garrafa 600ml",
    categoria: "Bebidas",
    descricao: "Garrafa gelada para dividir, servida no ponto trincando.",
    preco: 18,
    destaque: "Garrafa",
    imagem: require("../../assets/products/cerveja-garrafa.png"),
  },
];

const categorias = ["Todos", "Lanches", "Combos", "Porções", "Bebidas"];

function formatarPreco(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const { adicionarProduto, quantidadeTotal } = useContext(CarrinhoContext);

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return produtos.filter((produto) => {
      const combinaCategoria =
        categoria === "Todos" || produto.categoria === categoria;
      const combinaBusca =
        termo.length === 0 ||
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo);

      return combinaCategoria && combinaBusca;
    });
  }, [busca, categoria]);

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.etiqueta}>Aberto hoje até 23h</Text>
        <Text style={styles.titulo}>Sabor & Cia</Text>
        <Text style={styles.subtitulo}>
          Escolha seus favoritos e monte seu pedido pelo app.
        </Text>
      </View>

      <View style={styles.resumoTopo}>
        <Text style={styles.resumoTexto}>Itens no pedido</Text>
        <Text style={styles.resumoNumero}>{quantidadeTotal}</Text>
      </View>

      <TextInput
        style={styles.busca}
        placeholder="Buscar no cardápio"
        placeholderTextColor="#8c8177"
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.categorias}>
        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoriaBotao,
              categoria === item && styles.categoriaAtiva,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.categoriaTexto,
                categoria === item && styles.categoriaTextoAtivo,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={item.imagem}
              style={styles.imagemProduto}
              contentFit="cover"
              transition={180}
            />

            <View style={styles.cardTopo}>
              <Text style={styles.destaque}>{item.destaque}</Text>
              <Text style={styles.categoriaCard}>{item.categoria}</Text>
            </View>

            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>

            <View style={styles.cardRodape}>
              <Text style={styles.preco}>{formatarPreco(item.preco)}</Text>
              <Pressable
                style={styles.adicionar}
                onPress={() => adicionarProduto(item)}
              >
                <Text style={styles.adicionarTexto}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f4ee",
    paddingHorizontal: 18,
    paddingTop: 54,
  },
  cabecalho: {
    marginBottom: 18,
  },
  etiqueta: {
    color: "#9e2b20",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  titulo: {
    color: "#12462f",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 6,
  },
  subtitulo: {
    color: "#756b62",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  resumoTopo: {
    alignItems: "center",
    backgroundColor: "#12462f",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    padding: 16,
  },
  resumoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  resumoNumero: {
    color: "#f3b547",
    fontSize: 24,
    fontWeight: "900",
  },
  busca: {
    backgroundColor: "#fffdf8",
    borderColor: "#e4d8ca",
    borderRadius: 12,
    borderWidth: 1,
    color: "#241d18",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  categorias: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  categoriaBotao: {
    backgroundColor: "#fffaf2",
    borderColor: "#e4d8ca",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  categoriaAtiva: {
    backgroundColor: "#1f6d4a",
    borderColor: "#1f6d4a",
  },
  categoriaTexto: {
    color: "#756b62",
    fontSize: 13,
    fontWeight: "800",
  },
  categoriaTextoAtivo: {
    color: "#fff",
  },
  lista: {
    gap: 12,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: "#fffdf8",
    borderColor: "#e4d8ca",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  imagemProduto: {
    backgroundColor: "#efe4d5",
    height: 170,
    width: "100%",
  },
  cardTopo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  destaque: {
    backgroundColor: "#dff0dc",
    borderRadius: 999,
    color: "#12462f",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  categoriaCard: {
    color: "#8b5d12",
    fontSize: 12,
    fontWeight: "800",
  },
  nome: {
    color: "#241d18",
    fontSize: 21,
    fontWeight: "900",
    marginTop: 14,
    paddingHorizontal: 16,
  },
  descricao: {
    color: "#756b62",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  cardRodape: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    padding: 16,
    paddingTop: 0,
  },
  preco: {
    color: "#9e2b20",
    fontSize: 19,
    fontWeight: "900",
  },
  adicionar: {
    backgroundColor: "#9e2b20",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  adicionarTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
});
