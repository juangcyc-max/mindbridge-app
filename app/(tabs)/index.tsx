import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PLANS = [
  {
    name: 'Lanzamiento',
    setup: '990',
    monthly: '79',
    desc: 'Para freelancers y pequeños negocios',
    features: ['Landing page', 'Formulario de contacto', 'WhatsApp integrado', '1 automatización', 'Hosting cloud', 'IA: 500 consultas/mes'],
    popular: false,
  },
  {
    name: 'Negocio',
    setup: '2.490',
    monthly: '149',
    desc: 'Para PYMEs en crecimiento',
    features: ['Web multipágina + panel', 'Integración CRM', '3 automatizaciones', 'Chatbot IA', 'Monitorización 24/7', 'IA: 2.000 consultas/mes'],
    popular: true,
  },
  {
    name: 'Empresa',
    setup: '4.990+',
    monthly: '299',
    desc: 'Para empresas con volumen',
    features: ['Web custom + cloud completo', 'Automatizaciones ilimitadas', 'IA en todos los procesos', 'Integraciones ERP/CRM', 'Soporte prioritario', 'IA: 5.000 consultas/mes'],
    popular: false,
  },
];

const SERVICES = [
  { icon: 'globe-outline', title: 'Web', desc: 'Landings, webs multipágina, paneles de gestión y formularios de captación.' },
  { icon: 'cloud-outline', title: 'Cloud 24/7', desc: 'Hosting gestionado, automatizaciones activas y mantenimiento continuo.' },
  { icon: 'sparkles-outline', title: 'IA Integrada', desc: 'Clasificación de mensajes, respuestas automáticas y enrutamiento inteligente.' },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: insets.top + 20 }]}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Web · Cloud · IA</Text>
        </View>
        <Text style={styles.heroTitle}>Tu negocio digital,{'\n'}todo en uno</Text>
        <Text style={styles.heroSub}>
          Creamos tu presencia digital completa — web profesional, automatizaciones cloud e inteligencia artificial integrada.
        </Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/(tabs)/chat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
            <Text style={styles.btnPrimaryText}>Hablar con MI3.0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/(tabs)/budget')}>
            <Text style={styles.btnSecondaryText}>Ver precios</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué hacemos?</Text>
        {SERVICES.map((s, i) => (
          <View key={i} style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Ionicons name={s.icon as any} size={24} color="#10b981" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceTitle}>{s.title}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planes y precios</Text>
        {PLANS.map((plan, i) => (
          <View key={i} style={[styles.planCard, plan.popular && styles.planPopular]}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Más popular</Text>
              </View>
            )}
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDesc}>{plan.desc}</Text>
            <View style={styles.planPricing}>
              <Text style={styles.planSetup}>{plan.setup} € <Text style={styles.planSetupLabel}>setup</Text></Text>
              <Text style={styles.planMonthly}>+ {plan.monthly} €/mes</Text>
            </View>
            {plan.features.map((f, j) => (
              <View key={j} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.planBtn, plan.popular && styles.planBtnPopular]}
              onPress={() => router.push('/(tabs)/budget')}
            >
              <Text style={[styles.planBtnText, plan.popular && styles.planBtnTextPopular]}>
                Solicitar presupuesto
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>¿Tienes dudas?</Text>
        <Text style={styles.ctaSub}>Nuestro asistente IA MI3.0 te ayuda ahora mismo, sin esperas.</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/(tabs)/chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
          <Text style={styles.btnPrimaryText}>Iniciar chat</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Mindbridge IA · mindbride.net</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:juangutierrezdelaconcha@mindbride.net')}>
          <Text style={styles.footerLink}>juangutierrezdelaconcha@mindbride.net</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  hero: { paddingHorizontal: 24, paddingBottom: 40, backgroundColor: '#0f172a' },
  badge: { backgroundColor: '#10b98120', borderWidth: 1, borderColor: '#10b98140', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 16 },
  badgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },
  heroTitle: { color: '#f8fafc', fontSize: 32, fontWeight: '800', lineHeight: 40, marginBottom: 14 },
  heroSub: { color: '#94a3b8', fontSize: 15, lineHeight: 24, marginBottom: 28 },
  heroButtons: { flexDirection: 'row', gap: 12 },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 14, paddingVertical: 13, paddingHorizontal: 20 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnSecondary: { borderWidth: 1, borderColor: '#334155', borderRadius: 14, paddingVertical: 13, paddingHorizontal: 20, justifyContent: 'center' },
  btnSecondaryText: { color: '#94a3b8', fontWeight: '600', fontSize: 15 },
  section: { paddingHorizontal: 20, paddingVertical: 24, gap: 12 },
  sectionTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  serviceCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, backgroundColor: '#1e293b', borderRadius: 14, padding: 16 },
  serviceIcon: { width: 44, height: 44, backgroundColor: '#10b98115', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { color: '#f8fafc', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  serviceDesc: { color: '#64748b', fontSize: 13, lineHeight: 20 },
  planCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155', gap: 8 },
  planPopular: { borderColor: '#10b981', borderWidth: 2 },
  popularBadge: { backgroundColor: '#10b981', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  popularText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  planName: { color: '#f8fafc', fontSize: 20, fontWeight: '800' },
  planDesc: { color: '#64748b', fontSize: 13 },
  planPricing: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginVertical: 4 },
  planSetup: { color: '#10b981', fontSize: 24, fontWeight: '800' },
  planSetupLabel: { color: '#64748b', fontSize: 13, fontWeight: '400' },
  planMonthly: { color: '#94a3b8', fontSize: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { color: '#94a3b8', fontSize: 13 },
  planBtn: { marginTop: 8, borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 12, alignItems: 'center' },
  planBtnPopular: { backgroundColor: '#10b981', borderColor: '#10b981' },
  planBtnText: { color: '#64748b', fontWeight: '700', fontSize: 14 },
  planBtnTextPopular: { color: '#fff' },
  cta: { margin: 20, backgroundColor: '#10b98115', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#10b98130', gap: 10 },
  ctaTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '800' },
  ctaSub: { color: '#94a3b8', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  footer: { paddingHorizontal: 20, paddingTop: 8, gap: 6, alignItems: 'center' },
  footerText: { color: '#475569', fontSize: 12 },
  footerLink: { color: '#10b981', fontSize: 12 },
});
