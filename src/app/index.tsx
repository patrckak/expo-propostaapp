import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/MetricCard';
import { OrcamentoCard } from '@/components/OrcamentoCard';
import { Spacing } from '@/constants/theme';
import { metricas, orcamentos } from '@/data/mockData';

export default function HomeScreen() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const ultimosOrcamentos = orcamentos.slice(0, 10);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText type="title" style={styles.title}>
                Dashboard
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Visão geral do seu negócio
              </ThemedText>
            </View>
            <Button
              title="Novo Orçamento"
              onPress={() => router.push('/novo-orcamento')}
              style={styles.newButton}
            />
          </View>

          {/* Métricas */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Resumo
            </ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsContainer}
            >
              <MetricCard
                title="Faturamento Mensal"
                value={formatCurrency(metricas.faturamentoMensal)}
              />
              <MetricCard
                title="Serviços Ativos"
                value={metricas.totalServicos}
                subtitle="em andamento"
              />
              <MetricCard
                title="Clientes em Débito"
                value={metricas.clientesEmDebito}
                subtitle="requer atenção"
              />
              <MetricCard
                title="Orçamentos Pendentes"
                value={metricas.orcamentosPendentes}
                subtitle="aguardando resposta"
              />
            </ScrollView>
          </View>

          {/* Últimos Orçamentos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Últimos Orçamentos
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/orcamentos')}>
                <ThemedText type="linkPrimary" themeColor="primary">Ver todos</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.orcamentosList}>
              {ultimosOrcamentos.map((orcamento) => (
                <OrcamentoCard
                  key={orcamento.id}
                  orcamento={orcamento}
                  onPress={() => router.push(`/orcamento/${orcamento.id}`)}
                />
              ))}
            </View>
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
    gap: Spacing.three,
  },
  title: {
    fontSize: 32,
    marginBottom: Spacing.one,
  },
  newButton: {
    alignSelf: 'stretch',
  },
  section: {
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 20,
  },
  metricsContainer: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  orcamentosList: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
