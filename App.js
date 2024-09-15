import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function limpar() {
    setCodigo("");
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  }

  function validarEmail(email) {
    // Expressão regular para validar email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validarSenha(senha) {
    // Senha deve ter pelo menos 1 caractere maiúsculo, 1 número e 5 dígitos no total
    const re = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    return re.test(senha);
  }

  async function salvar() {
    // Validações
    if (codigo.length <= 0) {
      Alert.alert("Erro", "Código vazio!");
      return;
    }
    if (!nome) {
      Alert.alert("Erro", "Nome é obrigatório");
      return;
    }
    if (!validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "Senha e confirmação de senha devem ser iguais");
      return;
    }
    if (!validarSenha(senha)) {
      Alert.alert(
        "Erro",
        "Senha deve ter pelo menos 1 caractere maiúsculo, 1 número, e deve ter ao menos 5 dígitos"
      );
      return;
    }

    let objUsuario = {
      codigo: codigo,
      nome: nome,
      email: email,
      senha: senha,
      confirmarSenha: confirmarSenha,
    };

    const stringJson = JSON.stringify(objUsuario);

    await AsyncStorage.setItem("@usuario", stringJson);
    Alert.alert("Usuário Salvo");
  }

  async function carregar() {
    const conteudoJson = await AsyncStorage.getItem("@usuario");
    console.log(conteudoJson);
    if (conteudoJson != null) {
      const objUsuario = JSON.parse(conteudoJson);
      setCodigo(objUsuario.codigo);
      setNome(objUsuario.nome);
      setEmail(objUsuario.email);
      setSenha(objUsuario.senha);
      setConfirmarSenha(objUsuario.confirmarSenha);
    } else {
      Alert.alert("Dados não preenchidos!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo_principal}>Cadastro de usuário</Text>
      <Text style={styles.label_id}>Id</Text>

      <TextInput
        style={styles.caixa_id}
        onChangeText={(text) => setCodigo(text)}
        value={codigo}
        keyboardType="number-pad"
      />

      <Text style={styles.label_nome}>Nome</Text>

      <TextInput
        style={styles.caixa_nome}
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

      <Text style={styles.label_email}>E-mail</Text>

      <TextInput
        style={styles.caixa_email}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text style={styles.label_senha}>Senha</Text>

      <TextInput
        style={styles.caixa_senha}
        onChangeText={(text) => setSenha(text)}
        value={senha}
        secureTextEntry
      />

      <Text style={styles.label_confirmar_senha}>Confirmar Senha</Text>
      <TextInput
        style={styles.caixa_confirmar_senha}
        onChangeText={(text) => setConfirmarSenha(text)}
        value={confirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvar()}>
        <Text style={styles.legendaBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCarregar} onPress={() => carregar()}>
        <Text style={styles.legendaBotao}>Carregar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoLimpar} onPress={() => limpar()}>
        <Text style={styles.iconeLimpar}>🧹</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
