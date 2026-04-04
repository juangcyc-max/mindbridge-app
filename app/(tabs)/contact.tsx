import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Contact() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Campos requeridos', 'Por favor rellena nombre, email y mensaje.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://mindbride.net/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setSent(true);
      } else {
        Alert.alert('Error', data.error || 'No se pudo enviar. Inténtalo de nuevo.');
      }
    } catch {
      Alert.alert('Error de conexión', 'Comprueba tu conexión a internet.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <View style={[styles.successContainer, { paddingTop: insets.top }]}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#10b981" />
        </View>
        <Text style={styles.successTitle}>¡Mensaje enviado!</Text>
        <Text style={styles.successSub}>
          Gracias por contactarnos. Juan te responderá en menos de 24 horas.
        </Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}>
          <Text style={styles.btnPrimaryText}>Enviar otro mensaje</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Contacto</Text>
        <Text style={styles.subtitle}>Cuéntanos tu proyecto y te respondemos en menos de 24h.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={v => set('name', v)}
            placeholder="Tu nombre"
            placeholderTextColor="#475569"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={v => set('email', v)}
            placeholder="tu@email.com"
            placeholderTextColor="#475569"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={v => set('phone', v)}
            placeholder="+34 600 000 000"
            placeholderTextColor="#475569"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Mensaje *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={form.message}
            onChangeText={v => set('message', v)}
            placeholder="Cuéntanos qué necesitas..."
            placeholderTextColor="#475569"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.btnPrimary, sending && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={sending}
        >
          {sending
            ? <ActivityIndicator color="#fff" size="small" />
            : <>
                <Ionicons name="send-outline" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>Enviar mensaje</Text>
              </>
          }
        </TouchableOpacity>
      </View>

      {/* Contact info */}
      <View style={styles.contactInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#10b981" />
          <Text style={styles.infoText}>juangutierrezdelaconcha@mindbride.net</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#10b981" />
          <Text style={styles.infoText}>Respuesta en menos de 24h</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#10b981" />
          <Text style={styles.infoText}>Santander, Cantabria, España</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 24, paddingBottom: 24 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 15, lineHeight: 22 },
  form: { paddingHorizontal: 20, gap: 16 },
  field: { gap: 6 },
  label: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  input: { backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, borderWidth: 1, borderColor: '#334155' },
  textarea: { height: 120, textAlignVertical: 'top' },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 14, paddingVertical: 14, marginTop: 8 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  contactInfo: { margin: 20, marginTop: 32, backgroundColor: '#1e293b', borderRadius: 16, padding: 20, gap: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { color: '#94a3b8', fontSize: 13, flex: 1 },
  successContainer: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  successIcon: { width: 96, height: 96, backgroundColor: '#10b98115', borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  successTitle: { color: '#f8fafc', fontSize: 26, fontWeight: '800' },
  successSub: { color: '#64748b', fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
