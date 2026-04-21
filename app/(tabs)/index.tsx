import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STATS = [
  { value: '20+', label: 'Proyectos' },
  { value: '5★', label: 'Valoración' },
  { value: '24/7', label: 'Soporte' },
  { value: '3 días', label: 'Entrega media' },
];

const SERVICES = [
  {
    icon: 'globe-outline' as const,
    title: 'Web Profesional',
    desc: 'Landings, webs multipágina y paneles de gestión optimizados para conversión.',
    color: '#10b981',
  },
  {
    icon: 'cloud-outline' as const,
    title: 'Cloud 24/7',
    desc: 'Hosting gestionado, automatizaciones activas y mantenimiento continuo sin interrupciones.',
    color: '#3b82f6',
  },
  {
    icon: 'sparkles-outline' as const,
    title: 'IA Integrada',
    desc: 'Chatbots, clasificación automática de mensajes y respuestas inteligentes para tu negocio.',
    color: '#8b5cf6',
  },
];

const DEMOS = [
  {
    title: 'Fashion IA',
    category: 'E-commerce + IA',
    desc: 'Tienda online con recomendaciones automáticas por IA y panel de gestión.',
    color: '#10b981',
    metrics: ['+40% ventas', '+65% retención', '0.8s carga'],
    url: 'https://mindbride.net/portfolio/ecommerce',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Panel SaaS',
    desc: 'Dashboard analítico en tiempo real con +10.000 usuarios activos.',
    color: '#3b82f6',
    metrics: ['10.000+ users', '99.9% uptime', '50M eventos'],
    url: 'https://mindbride.net/portfolio/dashboard',
  },
  {
    title: 'AdLaunch Studio',
    category: 'Landing Page',
    desc: 'Landing de conversión con IA integrada para generación de leads.',
    color: '#8b5cf6',
    metrics: ['12.5% CVR', '-35% CAC', '+200% leads'],
    url: 'https://mindbride.net/portfolio/landing',
  },
];

const PLANS = [
  {
    name: 'Lanzamiento',
    setup: '990',
    monthly: '79',
    desc: 'Para freelancers y pequeños negocios',
    color: '#10b981',
    features: ['Landing page', 'Formulario de contacto', 'WhatsApp integrado', '1 automatización', 'Hosting cloud', 'IA: 500 consultas/mes'],
    popular: false,
  },
  {
    name: 'Negocio',
    setup: '2.490',
    monthly: '149',
    desc: 'Para PYMEs en crecimiento',
    color: '#10b981',
    features: ['Web multipágina + panel', 'Integración CRM', '3 automatizaciones', 'Chatbot IA', 'Monitorización 24/7', 'IA: 2.000 consultas/mes'],
    popular: true,
  },
  {
    name: 'Empresa',
    setup: '4.990+',
    monthly: '299',
    desc: 'Para empresas con volumen',
    color: '#10b981',
    features: ['Web custom + cloud completo', 'Automatizaciones ilimitadas', 'IA en todos los procesos', 'Integraciones ERP/CRM', 'Soporte prioritario', 'IA: 5.000 consultas/mes'],
    popular: false,
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <ImageBackground
        source={require('../../assets/splash-icon.png')}
        style={{ paddingTop: insets.top + 24, paddingBottom: 40 }}
        imageStyle={{ opacity: 0.07, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
        resizeMode="cover"
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>Mindbridge <Text style={styles.logoIA}>IA</Text></Text>
          </View>
          <TouchableOpacity style={styles.chatBadge} onPress={() => router.push('/(tabs)/chat')}>
            <View style={styles.onlineDot} />
            <Text style={styles.chatBadgeText}>MI3.0 online</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles-outline" size={12} color="#10b981" />
            <Text style={styles.heroBadgeText}>Web · Cloud · IA — Todo en uno</Text>
          </View>

          <Text style={styles.heroTitle}>Tu negocio digital,{'\n'}sin complicaciones</Text>
          <Text style={styles.heroSub}>
            Presencia digital completa con web profesional, automatizaciones cloud e inteligencia artificial integrada desde el primer día.
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
              <Ionicons name="chatbubble-ellipses-outline" size={17} color="#fff" />
              <Text style={styles.btnPrimaryText}>Hablar con MI3.0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/(tabs)/budget')} activeOpacity={0.85}>
              <Text style={styles.btnSecondaryText}>Ver precios</Text>
              <Ionicons name="arrow-forward" size={15} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {STATS.map((s, i) => (
              <View key={i} style={[styles.statItem, i < STATS.length - 1 && styles.statBorder]}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* Services */}
      <View style={styles.section}>
        <SectionHeader title="¿Qué hacemos?" subtitle="Tres áreas, una solución completa" />
        {SERVICES.map((s, i) => (
          <View key={i} style={[styles.serviceCard, { borderLeftColor: s.color }]}>
            <View style={[styles.serviceIconWrap, { backgroundColor: s.color + '15' }]}>
              <Ionicons name={s.icon} size={22} color={s.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceTitle}>{s.title}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Demos */}
      <View style={styles.section}>
        <SectionHeader title="Proyectos reales" subtitle="Resultados medibles desde el día 1" />
        {DEMOS.map((demo, i) => (
          <TouchableOpacity key={i} style={styles.demoCard} onPress={() => Linking.openURL(demo.url)} activeOpacity={0.85}>
            <View style={[styles.demoAccent, { backgroundColor: demo.color }]} />
            <View style={styles.demoContent}>
              <View style={styles.demoCategoryRow}>
                <View style={[styles.demoCategoryBadge, { backgroundColor: demo.color + '18', borderColor: demo.color + '35' }]}>
                  <Text style={[styles.demoCategoryText, { color: demo.color }]}>{demo.category}</Text>
                </View>
                <Ionicons name="arrow-forward" size={14} color={demo.color} />
              </View>
              <Text style={styles.demoTitle}>{demo.title}</Text>
              <Text style={styles.demoDesc}>{demo.desc}</Text>
              <View style={styles.demoMetrics}>
                {demo.metrics.map((m, j) => (
                  <View key={j} style={[styles.demoMetric, { borderColor: demo.color + '30' }]}>
                    <Text style={[styles.demoMetricText, { color: demo.color }]}>{m}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Plans */}
      <View style={styles.section}>
        <SectionHeader title="Planes y precios" subtitle="Sin permanencia. Sin sorpresas." />
        {PLANS.map((plan, i) => (
          <View key={i} style={[styles.planCard, plan.popular && styles.planPopular]}>
            {plan.popular && (
              <View style={styles.popularStrip}>
                <Ionicons name="star" size={11} color="#0f172a" />
                <Text style={styles.popularText}>Más popular</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDesc}>{plan.desc}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.planSetup}>{plan.setup} €</Text>
                <Text style={styles.planSetupLabel}>setup único</Text>
              </View>
            </View>
            <View style={styles.planMonthlyRow}>
              <Text style={styles.planMonthly}>+ {plan.monthly} €</Text>
              <Text style={styles.planMonthlyLabel}>/mes</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.featureList}>
              {plan.features.map((f, j) => (
                <View key={j} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={15} color="#10b981" />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.planBtn, plan.popular && styles.planBtnPopular]}
              onPress={() => router.push('/(tabs)/budget')}
              activeOpacity={0.85}
            >
              <Text style={[styles.planBtnText, plan.popular && styles.planBtnTextPopular]}>
                Solicitar presupuesto
              </Text>
              <Ionicons name="arrow-forward" size={15} color={plan.popular ? '#fff' : '#64748b'} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <View style={styles.ctaIconWrap}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#10b981" />
        </View>
        <Text style={styles.ctaTitle}>¿Tienes dudas?</Text>
        <Text style={styles.ctaSub}>MI3.0 te responde ahora mismo, sin esperas ni formularios.</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
          <Ionicons name="chatbubble-ellipses-outline" size={17} color="#fff" />
          <Text style={styles.btnPrimaryText}>Iniciar chat gratis</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <Text style={styles.footerBrand}>Mindbridge IA</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:juangutierrezdelaconcha@mindbride.net')}>
          <Text style={styles.footerLink}>juangutierrezdelaconcha@mindbride.net</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://mindbride.net')}>
          <Text style={styles.footerLink}>mindbride.net</Text>
        </TouchableOpacity>
        <Text style={styles.footerLocation}>Santander, Cantabria · España</Text>
      </View>
    </ScrollView>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionAccent} />
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080f1e' },

  // Top bar
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 28 },
  logoBadge: {},
  logoText: { color: '#f8fafc', fontSize: 18, fontWeight: '800' },
  logoIA: { color: '#10b981' },
  chatBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#10b98118', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#10b98130' },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10b981' },
  chatBadgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },

  // Hero
  hero: { paddingHorizontal: 20 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#10b98112', borderWidth: 1, borderColor: '#10b98125', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 18 },
  heroBadgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },
  heroTitle: { color: '#f8fafc', fontSize: 30, fontWeight: '800', lineHeight: 38, marginBottom: 14, letterSpacing: -0.5 },
  heroSub: { color: '#64748b', fontSize: 15, lineHeight: 25, marginBottom: 28 },
  heroButtons: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 18, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnSecondary: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#1e293b', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, justifyContent: 'center', backgroundColor: '#0f172a' },
  btnSecondaryText: { color: '#94a3b8', fontWeight: '600', fontSize: 14 },

  // Stats
  statsRow: { flexDirection: 'row', backgroundColor: '#0f172a', borderRadius: 14, borderWidth: 1, borderColor: '#1e293b', overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statBorder: { borderRightWidth: 1, borderRightColor: '#1e293b' },
  statValue: { color: '#10b981', fontSize: 16, fontWeight: '800' },
  statLabel: { color: '#475569', fontSize: 10, fontWeight: '600', marginTop: 2 },

  // Sections
  section: { paddingHorizontal: 20, paddingTop: 32, gap: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  sectionAccent: { width: 4, height: 36, backgroundColor: '#10b981', borderRadius: 2 },
  sectionTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  sectionSubtitle: { color: '#475569', fontSize: 13, marginTop: 2 },

  // Services
  serviceCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, backgroundColor: '#0f172a', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#1e293b', borderLeftWidth: 3 },
  serviceIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  serviceTitle: { color: '#f8fafc', fontSize: 15, fontWeight: '700', marginBottom: 5 },
  serviceDesc: { color: '#475569', fontSize: 13, lineHeight: 20 },

  // Demos
  demoCard: { backgroundColor: '#0f172a', borderRadius: 16, borderWidth: 1, borderColor: '#1e293b', overflow: 'hidden' },
  demoAccent: { height: 4, width: '100%' },
  demoContent: { padding: 16, gap: 8 },
  demoCategoryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  demoCategoryBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  demoCategoryText: { fontSize: 11, fontWeight: '700' },
  demoTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  demoDesc: { color: '#475569', fontSize: 13, lineHeight: 20 },
  demoMetrics: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  demoMetric: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  demoMetricText: { fontSize: 12, fontWeight: '700' },

  // Plans
  planCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#1e293b', gap: 0 },
  planPopular: { borderColor: '#10b981', borderWidth: 2 },
  popularStrip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#10b981', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 14 },
  popularText: { color: '#0f172a', fontSize: 11, fontWeight: '800' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  planName: { color: '#f8fafc', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  planDesc: { color: '#475569', fontSize: 13, marginTop: 3 },
  planSetup: { color: '#10b981', fontSize: 22, fontWeight: '800' },
  planSetupLabel: { color: '#475569', fontSize: 11, textAlign: 'right' },
  planMonthlyRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginBottom: 14 },
  planMonthly: { color: '#94a3b8', fontSize: 15, fontWeight: '700' },
  planMonthlyLabel: { color: '#475569', fontSize: 13 },
  planDivider: { height: 1, backgroundColor: '#1e293b', marginBottom: 14 },
  featureList: { gap: 8, marginBottom: 16 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { color: '#94a3b8', fontSize: 13, flex: 1 },
  planBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: '#1e293b', borderRadius: 12, padding: 13, backgroundColor: '#080f1e' },
  planBtnPopular: { backgroundColor: '#10b981', borderColor: '#10b981', shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 6 },
  planBtnText: { color: '#64748b', fontWeight: '700', fontSize: 14 },
  planBtnTextPopular: { color: '#fff' },

  // CTA
  cta: { margin: 20, marginTop: 32, backgroundColor: '#0f172a', borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#10b98130', gap: 10 },
  ctaIconWrap: { width: 60, height: 60, backgroundColor: '#10b98115', borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  ctaTitle: { color: '#f8fafc', fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  ctaSub: { color: '#475569', fontSize: 14, textAlign: 'center', lineHeight: 22 },

  // Footer
  footer: { paddingHorizontal: 20, paddingTop: 8, gap: 6, alignItems: 'center' },
  footerDivider: { width: 40, height: 1, backgroundColor: '#1e293b', marginBottom: 12 },
  footerBrand: { color: '#10b981', fontSize: 13, fontWeight: '700' },
  footerLink: { color: '#334155', fontSize: 12 },
  footerLocation: { color: '#1e293b', fontSize: 11, marginTop: 4 },
});
