import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { OrcamentoCard } from '@/components/OrcamentoCard';
import { Spacing } from '@/constants/theme';
import { orcamentos } from '@/data/mockData';
import { Orcamento } from '@/types';

export default function OrcamentosScreen() {
  const [filtroStatus, setFiltroStatus] = useState<Orcamento['status'] | 'todos'>('todos');

  const orcamentosFiltrados =
    filtroStatus === 'todos'
      ? orcamentos
      : orcamentos.filter((orc) => orc.status === filtroStatus);

  const filtros: Array<{ label: string; value: Orcamento['status'] | 'todos' }> = [
    { label: 'Todos', value: 'todos' },
    { label: 'Pendentes', value: 'pendente' },
    { label: 'Em Análise', value: 'em_analise' },
    { label: 'Aprovados', value: 'aprovado' },
    { label: 'Rejeitados', value: 'rejeitado' },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="linkPrimary" themeColor="primary">← Voltar</ThemedText>
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>
            Orçamentos
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {orcamentosFiltrados.length} orçamento{orcamentosFiltrados.length !== 1 ? 's' : ''}
          </ThemedText>
        </View>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosContainer}
          style={styles.filtrosScroll}
        >
          {filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro.value}
              style={[
                styles.filtroButton,
                filtroStatus === filtro.value && styles.filtroButtonActive,
              ]}
              onPress={() => setFiltroStatus(filtro.value)}
            >
              <ThemedText
                type="small"
                style={[
                  styles.filtroText,
                  filtroStatus === filtro.value && styles.filtroTextActive,
                ]}
              >
                {filtro.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de Orçamentos */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.orcamentosList}>
            {orcamentosFiltrados.map((orcamento) => (
              <OrcamentoCard
                key={orcamento.id}
                orcamento={orcamento}
                onPress={() => router.push(`/orcamento/${orcamento.id}`)}
              />
            ))}
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
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
    gap: Spacing.one,
  },
  title: {
    fontSize: 32,
  },
  filtrosScroll: {
    maxHeight: 50,
  },
  filtrosContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  filtroButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  filtroButtonActive: {
    backgroundColor: '#10b981', // emerald-500
  },
  filtroText: {
    fontWeight: '600',
  },
  filtroTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  orcamentosList: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
});
