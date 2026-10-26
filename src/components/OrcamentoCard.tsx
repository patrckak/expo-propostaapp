import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { Orcamento } from '@/types';

interface OrcamentoCardProps {
  orcamento: Orcamento;
  onPress?: () => void;
}

export function OrcamentoCard({ orcamento, onPress }: OrcamentoCardProps) {
  const getStatusColor = (status: Orcamento['status']) => {
    switch (status) {
      case 'aprovado':
        return '#10b981'; // emerald-500
      case 'rejeitado':
        return '#ef4444'; // red-500
      case 'em_analise':
        return '#f59e0b'; // amber-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const getStatusLabel = (status: Orcamento['status']) => {
    switch (status) {
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      case 'em_analise':
        return 'Em Análise';
      default:
        return 'Pendente';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText type="smallBold">{orcamento.numero}</ThemedText>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(orcamento.status) }]}>
              <ThemedText type="small" style={styles.statusText}>
                {getStatusLabel(orcamento.status)}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="subtitle" style={styles.value}>
            {formatCurrency(orcamento.valorTotal)}
          </ThemedText>
        </View>

        <View style={styles.clienteInfo}>
          <ThemedText type="default" style={styles.clienteNome}>
            {orcamento.cliente.nome}
          </ThemedText>
          {orcamento.cliente.empresa && (
            <ThemedText type="small" themeColor="textSecondary">
              {orcamento.cliente.empresa}
            </ThemedText>
          )}
        </View>

        <View style={styles.footer}>
          <ThemedText type="small" themeColor="textSecondary">
            Emitido: {formatDate(orcamento.dataEmissao)}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Validade: {formatDate(orcamento.validade)}
          </ThemedText>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    gap: Spacing.one,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  clienteInfo: {
    gap: Spacing.half,
    paddingTop: Spacing.one,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  clienteNome: {
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.one,
  },
});
