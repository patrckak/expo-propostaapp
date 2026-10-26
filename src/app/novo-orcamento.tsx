import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spacing } from '@/constants/theme';

export default function NovoOrcamentoScreen() {
  const [loading, setLoading] = useState(false);

  // Dados do Cliente
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [empresaCliente, setEmpresaCliente] = useState('');

  // Dados do Orçamento
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSalvar = async () => {
    // Validação básica
    if (!nomeCliente || !emailCliente || !telefoneCliente || !descricao || !valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Sucesso',
        'Orçamento criado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Novo Orçamento
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Preencha os dados do cliente e do orçamento
            </ThemedText>
          </View>

          {/* Dados do Cliente */}
          <Card style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Dados do Cliente
            </ThemedText>
            <Input
              label="Nome do Cliente *"
              placeholder="Ex: João Silva"
              value={nomeCliente}
              onChangeText={setNomeCliente}
            />
            <Input
              label="E-mail *"
              placeholder="cliente@email.com"
              value={emailCliente}
              onChangeText={setEmailCliente}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Telefone *"
              placeholder="(11) 98765-4321"
              value={telefoneCliente}
              onChangeText={setTelefoneCliente}
              keyboardType="phone-pad"
            />
            <Input
              label="Empresa (Opcional)"
              placeholder="Nome da empresa"
              value={empresaCliente}
              onChangeText={setEmpresaCliente}
            />
          </Card>

          {/* Dados do Orçamento */}
          <Card style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Dados do Orçamento
            </ThemedText>
            <Input
              label="Descrição do Serviço *"
              placeholder="Ex: Desenvolvimento de Website"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
              style={styles.textArea}
            />
            <Input
              label="Valor Total *"
              placeholder="R$ 0,00"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />
            <Input
              label="Observações (Opcional)"
              placeholder="Informações adicionais"
              value={observacoes}
              onChangeText={setObservacoes}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          </Card>

          {/* Botões de Ação */}
          <View style={styles.actions}>
            <Button
              title="Salvar Orçamento"
              onPress={handleSalvar}
              loading={loading}
            />
            <Button
              title="Cancelar"
              variant="outline"
              onPress={() => router.back()}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    gap: Spacing.one,
  },
  title: {
    fontSize: 32,
  },
  section: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.three,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Spacing.one,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actions: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
