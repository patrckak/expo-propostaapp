import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spacing } from '@/constants/theme';
import { orcamentos } from '@/data/mockData';

export default function OrcamentoDetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orcamento = orcamentos.find((orc) => orc.id === id);

  if (!orcamento) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <ThemedText type="subtitle">Orcamento nao encontrado</ThemedText>
            <Button title="Voltar" onPress={() => router.back()} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: typeof orcamento.status) => {
    switch (status) {
      case 'aprovado': return '#10b981';
      case 'rejeitado': return '#ef4444';
      case 'em_analise': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: typeof orcamento.status) => {
    switch (status) {
      case 'aprovado': return 'Aprovado';
      case 'rejeitado': return 'Rejeitado';
      case 'em_analise': return 'Em Analise';
      default: return 'Pendente';
    }
  };

  const handleCompartilhar = () => Alert.alert('Compartilhar', 'Em desenvolvimento');
  const handleEditar = () => Alert.alert('Editar', 'Em desenvolvimento');
  const handleExcluir = () => {
    Alert.alert('Confirmar Exclusao', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="linkPrimary" themeColor="primary">Voltar</ThemedText>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.topSection}>
            <ThemedText type="title" style={styles.numero}>{orcamento.numero}</ThemedText>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(orcamento.status) }]}>
              <ThemedText type="small" style={styles.statusText}>{getStatusLabel(orcamento.status)}</ThemedText>
            </View>
          </View>
          <Card style={styles.valorCard}>
            <ThemedText type="small" themeColor="textSecondary">Valor Total</ThemedText>
            <ThemedText type="title" style={styles.valorTotal}>{formatCurrency(orcamento.valorTotal)}</ThemedText>
          </Card>
          <Card style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Cliente</ThemedText>
            <View style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">Nome:</ThemedText>
              <ThemedText type="default">{orcamento.cliente.nome}</ThemedText>
            </View>
          </Card>
          <View style={styles.actions}>
            <Button title="Compartilhar" onPress={handleCompartilhar} />
            <Button title="Editar" variant="secondary" onPress={handleEditar} />
            <Button title="Excluir" variant="outline" onPress={handleExcluir} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.two },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.six },
  topSection: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.three, gap: Spacing.two },
  numero: { fontSize: 28 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
  statusText: { color: '#ffffff', fontWeight: '700' },
  valorCard: { marginHorizontal: Spacing.four, marginBottom: Spacing.three, alignItems: 'center', paddingVertical: Spacing.four },
  valorTotal: { fontSize: 36, marginTop: Spacing.one },
  section: { marginHorizontal: Spacing.four, marginBottom: Spacing.three, gap: Spacing.two },
  sectionTitle: { fontSize: 18, marginBottom: Spacing.one },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.two },
  actions: { paddingHorizontal: Spacing.four, gap: Spacing.two, marginTop: Spacing.two },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.four, paddingHorizontal: Spacing.four },
});
