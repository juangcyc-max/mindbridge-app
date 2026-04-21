import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PROJECT_TYPES = ['Landing page', 'Web multipágina', 'Tienda online', 'Panel de gestión', 'App web', 'Otro'];
const BUDGET_RANGES = ['< 1.000 €', '1.000 – 3.000 €', '3.000 – 6.000 €', '6.000 – 15.000 €', '> 15.000 €'];
const TIMELINES = ['Lo antes posible', '1 – 2 meses', '2 – 4 meses', '+ de 4 meses'];
const ADDONS = ['SEO avanzado', 'Chatbot IA', 'Analytics avanzado', 'CMS', 'Multiidioma', 'WhatsApp', 'CRM', 'Automatizaciones'];

export default function Budget() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    project_type: '', budget_range: '', timeline: '',
    additional_info: '', addons: [] as string[],
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function toggleAddon(addon: string) {
    setForm(f => ({
      ...f,
      addons: f.addons.includes(addon)
        ? f.addons.filter(a => a !== addon)
        : [...f.addons, addon],
    }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email) {
      Alert.alert('Campos requeridos', 'Nombre y email son obligatorios.');
      return;
    }
    setSending(true);
    try {
      const body = {
        ...form,
        additional_info: [
          form.additional_info,
          form.addons.length > 0 ? `Extras deseados: ${form.addons.join(', ')}` : '',
        ].filter(Boolean).join('\n\n'),
      };
      const res = await fetch('https://mindbride.net/api/budget-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) setSent(true);
      else Alert.alert('Error', 'No se pudo enviar. Inténtalo de nuevo.');
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
        <Text style={styles.successTitle}>¡Solicitud enviada!</Text>
        <Text style={styles.successSub}>Juan preparará tu presupuesto personalizado y te lo enviará en 24-48h.</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => { setSent(false); setForm({ name: '', email: '', company: '', phone: '', project_type: '', budget_range: '', timeline: '', additional_info: '', addons: [] }); }}>
          <Text style={styles.btnPrimaryText}>Nueva solicitud</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.title}>Solicitar presupuesto</Text>
        <Text style={styles.subtitle}>Cuéntanos tu proyecto y te enviamos un presupuesto personalizado en 24-48h.</Text>
      </View>

      <View style={styles.form}>
        {/* Datos personales */}
        <Text style={styles.sectionLabel}>TUS DATOS</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={v => set('name', v)} placeholder="Nombre *" placeholderTextColor="#475569" />
        <TextInput style={styles.input} value={form.email} onChangeText={v => set('email', v)} placeholder="Email *" placeholderTextColor="#475569" keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} value={form.company} onChangeText={v => set('company', v)} placeholder="Empresa (opcional)" placeholderTextColor="#475569" />
        <TextInput style={styles.input} value={form.phone} onChangeText={v => set('phone', v)} placeholder="Teléfono (opcional)" placeholderTextColor="#475569" keyboardType="phone-pad" />

        {/* Tipo de proyecto */}
        <Text style={styles.sectionLabel}>TIPO DE PROYECTO</Text>
        <View style={styles.chips}>
          {PROJECT_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, form.project_type === type && styles.chipActive]}
              onPress={() => set('project_type', form.project_type === type ? '' : type)}
            >
              <Text style={[styles.chipText, form.project_type === type && styles.chipTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Presupuesto */}
        <Text style={styles.sectionLabel}>PRESUPUESTO ESTIMADO</Text>
        <View style={styles.chips}>
          {BUDGET_RANGES.map(range => (
            <TouchableOpacity
              key={range}
              style={[styles.chip, form.budget_range === range && styles.chipActive]}
              onPress={() => set('budget_range', form.budget_range === range ? '' : range)}
            >
              <Text style={[styles.chipText, form.budget_range === range && styles.chipTextActive]}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plazo */}
        <Text style={styles.sectionLabel}>PLAZO</Text>
        <View style={styles.chips}>
          {TIMELINES.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, form.timeline === t && styles.chipActive]}
              onPress={() => set('timeline', form.timeline === t ? '' : t)}
            >
              <Text style={[styles.chipText, form.timeline === t && styles.chipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add-ons */}
        <Text style={styles.sectionLabel}>EXTRAS (opcional)</Text>
        <View style={styles.chips}>
          {ADDONS.map(addon => (
            <TouchableOpacity
              key={addon}
              style={[styles.chip, form.addons.includes(addon) && styles.chipActive]}
              onPress={() => toggleAddon(addon)}
            >
              <Text style={[styles.chipText, form.addons.includes(addon) && styles.chipTextActive]}>{addon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info adicional */}
        <Text style={styles.sectionLabel}>INFORMACIÓN ADICIONAL</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={form.additional_info}
          onChangeText={v => set('additional_info', v)}
          placeholder="Cuéntanos más sobre tu proyecto..."
          placeholderTextColor="#475569"
          multiline
          numberOfLines={4}
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
                <Ionicons name="calculator-outline" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>Solicitar presupuesto</Text>
              </>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 24, paddingBottom: 24 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#64748b', fontSize: 15, lineHeight: 22 },
  form: { paddingHorizontal: 20, gap: 10 },
  sectionLabel: { color: '#10b981', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, borderWidth: 1, borderColor: '#334155' },
  textarea: { height: 100, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  chipActive: { backgroundColor: '#10b981', borderColor: '#10b981' },
  chipText: { color: '#64748b', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 14, paddingVertical: 14, marginTop: 12 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  successIcon: { width: 96, height: 96, backgroundColor: '#10b98115', borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  successTitle: { color: '#f8fafc', fontSize: 26, fontWeight: '800' },
  successSub: { color: '#64748b', fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
