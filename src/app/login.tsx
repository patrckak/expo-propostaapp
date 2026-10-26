import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      setLoading(false);
      // Navegar para a home após login
      router.replace('/');
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Bem-vindo
              </ThemedText>
              <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
                Faça login para continuar
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Input
                label="E-mail"
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                label="Senha"
                placeholder="••••••••"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoComplete="password"
              />

              <Button
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
                style={styles.button}
              />

              <Button
                title="Esqueci minha senha"
                variant="outline"
                onPress={() => {}}
                style={styles.forgotButton}
              />
            </View>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.footerText}>
                Não tem uma conta?
              </ThemedText>
              <Button
                title="Criar conta"
                variant="secondary"
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  title: {
    fontSize: 36,
    marginBottom: Spacing.two,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  button: {
    marginTop: Spacing.two,
  },
  forgotButton: {
    marginTop: Spacing.one,
  },
  footer: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  footerText: {
    textAlign: 'center',
  },
});
