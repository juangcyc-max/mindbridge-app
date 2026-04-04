import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PRIORITIES = [
  { value: 'normal', label: 'Normal', desc: 'Sin urgencia' },
  { value: 'high', label: 'Alta', desc: 'Afecta al trabajo' },
  { value: 'urgent', label: 'Urgente', desc: 'Sistema caído' },
];

export default function Support() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ name: '', email: '', service: '', description: '', priority: 'normal' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ resolvedByAI: boolean; aiResponse?: string } | null>(null);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.description) {
      Alert.alert('Campos requeridos', 'Nombre, email y descripción son obligatorios.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://mindbride.net/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ resolvedByAI: data.resolvedByAI, aiResponse: undefined });
      } else {
        Alert.alert('Error', data.error || 'No se pudo enviar. Inténtalo de nuevo.');
      }
    } catch {
      Alert.alert('Error de conexión', 'Comprueba tu conexión a internet.');
    } finally {
      setSending(false);
    }
  }

  if (result) {
    return (
      <View style={[styles.successContainer, { paddingTop: insets.top }]}>
        <View style={[styles.successIcon, { backgroundColor: result.resolvedByAI ? '#10b98115' : '#ef444415' }]}>
          <Ionicons
            name={result.resolvedByAI ? 'checkmark-circle' : 'time-outline'}
            size={64}
            color={result.resolvedByAI ? '#10b981' : '#ef4444'}
          />
        </View>
        <Text style={styles.successTitle}>
          {result.resolvedByAI ? 'Incidencia resuelta' : 'Incidencia registrada'}
        </Text>
        <Text style={styles.successSub}>
          {result.resolvedByAI
            ? 'La IA ha resuelto tu consulta. Revisa tu email para ver la respuesta detallada.'
            : 'Juan revisará tu incidencia y te contactará lo antes posible. Hemos enviado un email de confirmación.'}
        </Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => { setResult(null); setForm({ name: '', email: '', service: '', description: '', priority: 'normal' }); }}
        >
          <Text style={styles.btnPrimaryText}>Nueva incidencia</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Soporte técnico</Text>
        <Text style={styles.subtitle}>Describe tu problema y la IA intentará resolverlo automáticamente. Si no puede, Juan te contactará.</Text>
      </View>

      {/* Info chips */}
      <View style={styles.infoBanner}>
        <View style={styles.infoItem}>
          <Ionicons name="flash-outline" size={18} color="#10b981" />
          <Text style={styles.infoText}>Respuesta IA inmediata</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={18} color="#10b981" />
          <Text style={styles.infoText}>Escalado a Juan si es necesario</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionLabel}>TUS DATOS</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={v => set('name', v)} placeholder="Nombre *" placeholderTextColor="#475569" />
        <TextInput style={styles.input} value={form.email} onChangeText={v => set('email', v)} placeholder="Email *" placeholderTextColor="#475569" keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} value={form.service} onChangeText={v => set('service', v)} placeholder="Servicio afectado (opcional)" placeholderTextColor="#475569" />

        <Text style={styles.sectionLabel}>URGENCIA</Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map(p => (
            <TouchableOpacity
              key={p.value}
              style={[styles.priorityCard, form.priority === p.value && styles.priorityCardActive]}
              onPress={() => set('priority', p.value)}
            >
              <Text style={[styles.priorityLabel, form.priority === p.value && styles.priorityLabelActive]}>{p.label}</Text>
              <Text style={styles.priorityDesc}>{p.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>DESCRIPCIÓN DEL PROBLEMA *</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={form.description}
          onChangeText={v => set('description', v)}
          placeholder="Describe detalladamente el problema..."
          placeholderTextColor="#475569"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.btnPrimary, sending && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={sending}
        >
          {sending
            ? <ActivityIndicator color="#fff" size="small" />
            : <>
                <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>Enviar incidencia</Text>
              </>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 24, paddingBottom: 16 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 14, lineHeight: 22 },
  infoBanner: { marginHorizontal: 20, marginBottom: 8, backgroundColor: '#1e293b', borderRadius: 12, padding: 14, gap: 10 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { color: '#94a3b8', fontSize: 13 },
  form: { paddingHorizontal: 20, gap: 10 },
  sectionLabel: { color: '#10b981', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, borderWidth: 1, borderColor: '#334155' },
  textarea: { height: 130, textAlignVertical: 'top' },
  priorityRow: { flexDirection: 'row', gap: 8 },
  priorityCard: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#334155', alignItems: 'center', gap: 2 },
  priorityCardActive: { borderColor: '#10b981', backgroundColor: '#10b98115' },
  priorityLabel: { color: '#64748b', fontWeight: '700', fontSize: 13 },
  priorityLabelActive: { color: '#10b981' },
  priorityDesc: { color: '#475569', fontSize: 11, textAlign: 'center' },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 14, paddingVertical: 14, marginTop: 12 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  successIcon: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  successTitle: { color: '#f8fafc', fontSize: 26, fontWeight: '800' },
  successSub: { color: '#64748b', fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
