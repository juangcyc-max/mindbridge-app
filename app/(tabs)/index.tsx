import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STATS = [
  { value: '20+', label: 'Proyectos' },
  { value: '5★', label: 'Valoración' },
  { value: '24/7', label: 'Soporte' },
  { value: '~15 días', label: 'Entrega media' },
];

const SERVICES = [
  { icon: 'globe-outline' as const, title: 'Web Profesional', desc: 'Landings, webs multipágina y paneles de gestión optimizados para conversión.', color: '#10b981' },
  { icon: 'cloud-outline' as const, title: 'Cloud 24/7', desc: 'Hosting gestionado, automatizaciones activas y mantenimiento continuo.', color: '#3b82f6' },
  { icon: 'sparkles-outline' as const, title: 'IA Integrada', desc: 'Chatbots, clasificación automática de mensajes y respuestas inteligentes.', color: '#8b5cf6' },
];

const PROJECTS = [
  {
    title: 'Persianas Santander',
    category: 'CASO REAL',
    badge: true,
    desc: 'Web profesional con formulario de contacto, galería de trabajos y posicionamiento local SEO.',
    features: ['Diseño responsive', 'Entrega en 15 días', 'SEO local incluido'],
    color: '#f59e0b',
    bg: '#f59e0b',
    logo: require('../../assets/persianassantander.png'),
    url: null,
    metrics: [{ label: 'Valoración', value: '5★' }, { label: 'Entrega', value: '15 días' }, { label: 'Online', value: '100%' }],
  },
  {
    title: 'Fashion IA',
    category: 'E-commerce + IA',
    badge: false,
    desc: 'Tienda online con recomendaciones automáticas por IA y panel de gestión integrado.',
    features: ['Recomendaciones IA', 'Panel admin', 'Analytics avanzado'],
    color: '#10b981',
    bg: '#10b981',
    logo: require('../../assets/fashion-ia.png'),
    url: 'https://mindbride.net/portfolio/ecommerce',
    metrics: [{ label: 'Ventas', value: '+40%' }, { label: 'Retención', value: '+65%' }, { label: 'Carga', value: '0.8s' }],
  },
  {
    title: 'SaaS Dashboard',
    category: 'Panel SaaS',
    badge: false,
    desc: 'Dashboard analítico en tiempo real con +10.000 usuarios activos simultáneos.',
    features: ['Tiempo real', '99.9% uptime', '50M eventos/mes'],
    color: '#3b82f6',
    bg: '#2563eb',
    logo: require('../../assets/saaslogo.png'),
    url: 'https://mindbride.net/portfolio/dashboard',
    metrics: [{ label: 'Usuarios', value: '10K+' }, { label: 'Uptime', value: '99.9%' }, { label: 'Eventos', value: '50M' }],
  },
  {
    title: 'AdLaunch Studio',
    category: 'Landing Page',
    badge: false,
    desc: 'Landing de alta conversión con IA integrada para generación y cualificación de leads.',
    features: ['CVR 12.5%', 'Leads +200%', 'CAC -35%'],
    color: '#8b5cf6',
    bg: '#7c3aed',
    logo: require('../../assets/adlaunch-studio.png'),
    url: 'https://mindbride.net/portfolio/landing',
    metrics: [{ label: 'Conversión', value: '12.5%' }, { label: 'CAC', value: '-35%' }, { label: 'Leads', value: '+200%' }],
  },
  {
    title: 'Blockself',
    category: 'WEB + DISEÑO',
    badge: true,
    desc: 'Web moderna con identidad de marca, diseño a medida y optimización para conversión.',
    features: ['Diseño a medida', 'Responsive', 'SEO incluido'],
    color: '#06b6d4',
    bg: '#0891b2',
    logo: require('../../assets/blockself.png'),
    url: 'https://blockself.net',
    metrics: [{ label: 'Valoración', value: '5★' }, { label: 'Entrega', value: '15 días' }, { label: 'Online', value: '100%' }],
  },
];

const REVIEWS = [
  { name: 'Lisandra Vega Fuente', initials: 'L', color: '#10b981', text: '"Genial, un excelente trabajo con esta página tan funcional, ojalá otros puedan disfrutar de sus beneficios."' },
  { name: 'Diana Gonzalez', initials: 'D', color: '#3b82f6', text: null },
  { name: 'Alessandra Borda Pardo', initials: 'A', color: '#8b5cf6', text: null },
];

const PLANS = [
  { name: 'Lanzamiento', setup: '990', monthly: '79', desc: 'Para freelancers y pequeños negocios', features: ['Landing page', 'Formulario de contacto', 'WhatsApp integrado', '1 automatización', 'Hosting cloud', 'IA: 500 consultas/mes'], popular: false },
  { name: 'Negocio', setup: '2.490', monthly: '149', desc: 'Para PYMEs en crecimiento', features: ['Web multipágina + panel', 'Integración CRM', '3 automatizaciones', 'Chatbot IA', 'Monitorización 24/7', 'IA: 2.000 consultas/mes'], popular: true },
  { name: 'Empresa', setup: '4.990+', monthly: '299', desc: 'Para empresas con volumen', features: ['Web custom + cloud completo', 'Automatizaciones ilimitadas', 'IA en todos los procesos', 'Integraciones ERP/CRM', 'Soporte prioritario', 'IA: 5.000 consultas/mes'], popular: false },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={s.container} contentContainerStyle={{ paddingBottom: 48 }} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <ImageBackground
        source={require('../../assets/office-background.jpg')}
        style={{ paddingTop: insets.top + 24, paddingBottom: 40 }}
        imageStyle={{ opacity: 0.25 }}
        resizeMode="cover"
      >
        <View style={s.topBar}>
          <Text style={s.logoText}>Mindbridge <Text style={s.logoIA}>IA</Text></Text>
          <TouchableOpacity style={s.chatBadge} onPress={() => router.push('/(tabs)/chat')}>
            <View style={s.onlineDot} />
            <Text style={s.chatBadgeText}>MI3.0 online</Text>
          </TouchableOpacity>
        </View>

        <View style={s.hero}>
          <View style={s.heroBadge}>
            <Ionicons name="sparkles-outline" size={12} color="#10b981" />
            <Text style={s.heroBadgeText}>Web · Cloud · IA — Todo en uno</Text>
          </View>
          <Text style={s.heroTitle}>Tu negocio digital,{'\n'}sin complicaciones</Text>
          <Text style={s.heroSub}>Presencia digital completa con web profesional, automatizaciones cloud e inteligencia artificial desde el primer día.</Text>

          <View style={s.heroButtons}>
            <TouchableOpacity style={s.btnPrimary} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
              <Ionicons name="chatbubble-ellipses-outline" size={17} color="#fff" />
              <Text style={s.btnPrimaryText}>Hablar con MI3.0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSecondary} onPress={() => router.push('/(tabs)/budget')} activeOpacity={0.85}>
              <Text style={s.btnSecondaryText}>Ver precios</Text>
              <Ionicons name="arrow-forward" size={15} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View style={s.statsRow}>
            {STATS.map((st, i) => (
              <View key={i} style={[s.statItem, i < STATS.length - 1 && s.statBorder]}>
                <Text style={s.statValue}>{st.value}</Text>
                <Text style={s.statLabel}>{st.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* Servicios */}
      <View style={s.section}>
        <SectionHeader title="¿Qué hacemos?" subtitle="Tres áreas, una solución completa" />
        {SERVICES.map((sv, i) => (
          <View key={i} style={[s.serviceCard, { borderLeftColor: sv.color }]}>
            <View style={[s.serviceIcon, { backgroundColor: sv.color + '25' }]}>
              <Ionicons name={sv.icon} size={22} color={sv.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.serviceTitle}>{sv.title}</Text>
              <Text style={s.serviceDesc}>{sv.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Proyectos */}
      <View style={s.section}>
        <SectionHeader title="Proyectos reales" subtitle="Resultados medibles desde el día 1" />
        {PROJECTS.map((p, i) => {
          const Card = p.url ? TouchableOpacity : View;
          return (
            <Card
              key={i}
              style={s.projectCard}
              {...(p.url ? { onPress: () => Linking.openURL(p.url!), activeOpacity: 0.88 } : {})}
            >
              {/* Header coloreado con logo */}
              <View style={[s.projectHeader, { backgroundColor: p.bg }]}>
                {p.badge && (
                  <View style={s.casoBadge}>
                    <Text style={s.casoBadgeText}>✓ CASO REAL</Text>
                  </View>
                )}
                <View style={s.logoBox}>
                  <Image source={p.logo} style={s.projectLogo} resizeMode="contain" />
                </View>
              </View>

              {/* Cuerpo */}
              <View style={s.projectBody}>
                <View style={[s.catBadge, { backgroundColor: p.color + '20', borderColor: p.color + '50' }]}>
                  <Text style={[s.catText, { color: p.color }]}>{p.category}</Text>
                </View>
                <Text style={s.projectTitle}>{p.title}</Text>
                <Text style={s.projectDesc}>{p.desc}</Text>
                <View style={s.featureList}>
                  {p.features.map((f, j) => (
                    <View key={j} style={s.featureRow}>
                      <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                      <Text style={s.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>
                <View style={s.metricsRow}>
                  {p.metrics.map((m, j) => (
                    <View key={j} style={[s.metricBox, { borderColor: p.color + '30' }]}>
                      <Text style={[s.metricValue, { color: p.color }]}>{m.value}</Text>
                      <Text style={s.metricLabel}>{m.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
          );
        })}
      </View>

      {/* Reseñas */}
      <View style={s.section}>
        <SectionHeader title="Lo que dicen los clientes" subtitle="5/5 en Google · 3 reseñas" />
        <View style={s.ratingBadge}>
          <Text style={s.ratingScore}>5.0</Text>
          <Text style={s.ratingStars}>★★★★★</Text>
          <Text style={s.ratingLabel}>Google</Text>
        </View>
        {REVIEWS.map((r, i) => (
          <View key={i} style={s.reviewCard}>
            <View style={s.reviewHeader}>
              <View style={[s.avatar, { backgroundColor: r.color }]}>
                <Text style={s.avatarText}>{r.initials}</Text>
              </View>
              <View>
                <Text style={s.reviewName}>{r.name}</Text>
                <Text style={s.reviewStars}>★★★★★ · Google</Text>
              </View>
            </View>
            {r.text && <Text style={s.reviewText}>{r.text}</Text>}
          </View>
        ))}
      </View>

      {/* Planes */}
      <View style={s.section}>
        <SectionHeader title="Planes y precios" subtitle="Sin permanencia. Sin sorpresas." />
        {PLANS.map((plan, i) => (
          <View key={i} style={[s.planCard, plan.popular && s.planPopular]}>
            {plan.popular && (
              <View style={s.popularBadge}>
                <Ionicons name="star" size={11} color="#0f172a" />
                <Text style={s.popularText}>Más popular</Text>
              </View>
            )}
            <View style={s.planTop}>
              <View>
                <Text style={s.planName}>{plan.name}</Text>
                <Text style={s.planDesc}>{plan.desc}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.planSetup}>{plan.setup} €</Text>
                <Text style={s.planSetupLabel}>setup único</Text>
              </View>
            </View>
            <View style={s.planMonthlyRow}>
              <Text style={s.planMonthly}>+ {plan.monthly} €</Text>
              <Text style={s.planMonthlyLabel}>/mes</Text>
            </View>
            <View style={s.divider} />
            <View style={s.featureList}>
              {plan.features.map((f, j) => (
                <View key={j} style={s.featureRow}>
                  <Ionicons name="checkmark-circle" size={15} color="#10b981" />
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[s.planBtn, plan.popular && s.planBtnPopular]}
              onPress={() => router.push('/(tabs)/budget')}
              activeOpacity={0.85}
            >
              <Text style={[s.planBtnText, plan.popular && s.planBtnTextPopular]}>Solicitar presupuesto</Text>
              <Ionicons name="arrow-forward" size={15} color={plan.popular ? '#fff' : '#64748b'} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={s.cta}>
        <View style={s.ctaIcon}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#10b981" />
        </View>
        <Text style={s.ctaTitle}>¿Tienes dudas?</Text>
        <Text style={s.ctaSub}>MI3.0 te responde ahora mismo, sin esperas ni formularios.</Text>
        <TouchableOpacity style={s.btnPrimary} onPress={() => router.push('/(tabs)/chat')} activeOpacity={0.85}>
          <Ionicons name="chatbubble-ellipses-outline" size={17} color="#fff" />
          <Text style={s.btnPrimaryText}>Iniciar chat gratis</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <View style={s.footerLine} />
        <Text style={s.footerBrand}>Mindbridge IA</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:juangutierrezdelaconcha@mindbride.net')}>
          <Text style={s.footerLink}>juangutierrezdelaconcha@mindbride.net</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://mindbride.net')}>
          <Text style={s.footerLink}>mindbride.net</Text>
        </TouchableOpacity>
        <Text style={s.footerCity}>Santander, Cantabria · España</Text>
      </View>
    </ScrollView>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionAccent} />
      <View>
        <Text style={s.sectionTitle}>{title}</Text>
        <Text style={s.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const BG = '#111827';
const CARD = '#1e293b';
const BORDER = '#334155';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const DIM = '#64748b';

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },

  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 28 },
  logoText: { color: TEXT, fontSize: 18, fontWeight: '800' },
  logoIA: { color: '#10b981' },
  chatBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#10b98120', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#10b98140' },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10b981' },
  chatBadgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },

  hero: { paddingHorizontal: 20 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#10b98115', borderWidth: 1, borderColor: '#10b98130', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 18 },
  heroBadgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },
  heroTitle: { color: TEXT, fontSize: 30, fontWeight: '800', lineHeight: 38, marginBottom: 14, letterSpacing: -0.5 },
  heroSub: { color: MUTED, fontSize: 15, lineHeight: 25, marginBottom: 28 },
  heroButtons: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#10b981', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 18, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnSecondary: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: BORDER, borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: CARD },
  btnSecondaryText: { color: MUTED, fontWeight: '600', fontSize: 14 },

  statsRow: { flexDirection: 'row', backgroundColor: CARD, borderRadius: 14, borderWidth: 1, borderColor: BORDER, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statBorder: { borderRightWidth: 1, borderRightColor: BORDER },
  statValue: { color: '#10b981', fontSize: 15, fontWeight: '800' },
  statLabel: { color: DIM, fontSize: 10, fontWeight: '600', marginTop: 2 },

  section: { paddingHorizontal: 20, paddingTop: 32, gap: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  sectionAccent: { width: 4, height: 36, backgroundColor: '#10b981', borderRadius: 2 },
  sectionTitle: { color: TEXT, fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  sectionSubtitle: { color: DIM, fontSize: 13, marginTop: 2 },

  serviceCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, backgroundColor: CARD, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: BORDER, borderLeftWidth: 3 },
  serviceIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  serviceTitle: { color: TEXT, fontSize: 15, fontWeight: '700', marginBottom: 5 },
  serviceDesc: { color: DIM, fontSize: 13, lineHeight: 20 },

  // Projects
  projectCard: { backgroundColor: CARD, borderRadius: 20, borderWidth: 1, borderColor: BORDER, overflow: 'hidden', marginBottom: 4 },
  projectHeader: { height: 160, justifyContent: 'center', alignItems: 'center' },
  casoBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  casoBadgeText: { color: '#10b981', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  logoBox: { backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8 },
  projectLogo: { width: 130, height: 55 },
  projectBody: { padding: 16, gap: 8 },
  catBadge: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  catText: { fontSize: 11, fontWeight: '700' },
  projectTitle: { color: TEXT, fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  projectDesc: { color: DIM, fontSize: 13, lineHeight: 20 },
  featureList: { gap: 6 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { color: MUTED, fontSize: 13, flex: 1 },
  metricsRow: { flexDirection: 'row', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: BORDER, marginTop: 4 },
  metricBox: { flex: 1, alignItems: 'center', backgroundColor: BG, borderRadius: 10, paddingVertical: 10, borderWidth: 1 },
  metricValue: { fontSize: 15, fontWeight: '900' },
  metricLabel: { color: DIM, fontSize: 10, fontWeight: '600', marginTop: 3, textAlign: 'center' },

  // Reviews
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: CARD, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: BORDER },
  ratingScore: { color: TEXT, fontSize: 28, fontWeight: '900' },
  ratingStars: { color: '#fbbf24', fontSize: 18, letterSpacing: 2 },
  ratingLabel: { color: DIM, fontSize: 13, fontWeight: '600' },
  reviewCard: { backgroundColor: CARD, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: BORDER, gap: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  reviewName: { color: TEXT, fontSize: 14, fontWeight: '700' },
  reviewStars: { color: '#fbbf24', fontSize: 11, marginTop: 2 },
  reviewText: { color: MUTED, fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  // Plans
  planCard: { backgroundColor: CARD, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: BORDER },
  planPopular: { borderColor: '#10b981', borderWidth: 2 },
  popularBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#10b981', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 14 },
  popularText: { color: '#0f172a', fontSize: 11, fontWeight: '800' },
  planTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  planName: { color: TEXT, fontSize: 20, fontWeight: '800' },
  planDesc: { color: DIM, fontSize: 13, marginTop: 3 },
  planSetup: { color: '#10b981', fontSize: 22, fontWeight: '800' },
  planSetupLabel: { color: DIM, fontSize: 11, textAlign: 'right' },
  planMonthlyRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginBottom: 14 },
  planMonthly: { color: MUTED, fontSize: 15, fontWeight: '700' },
  planMonthlyLabel: { color: DIM, fontSize: 13 },
  divider: { height: 1, backgroundColor: BORDER, marginBottom: 14 },
  planBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 13, backgroundColor: BG, marginTop: 4 },
  planBtnPopular: { backgroundColor: '#10b981', borderColor: '#10b981', elevation: 6 },
  planBtnText: { color: DIM, fontWeight: '700', fontSize: 14 },
  planBtnTextPopular: { color: '#fff' },

  cta: { margin: 20, marginTop: 32, backgroundColor: CARD, borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#10b98130', gap: 10 },
  ctaIcon: { width: 60, height: 60, backgroundColor: '#10b98120', borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  ctaTitle: { color: TEXT, fontSize: 22, fontWeight: '800' },
  ctaSub: { color: DIM, fontSize: 14, textAlign: 'center', lineHeight: 22 },

  footer: { paddingHorizontal: 20, paddingTop: 8, gap: 6, alignItems: 'center' },
  footerLine: { width: 40, height: 1, backgroundColor: BORDER, marginBottom: 12 },
  footerBrand: { color: '#10b981', fontSize: 13, fontWeight: '700' },
  footerLink: { color: BORDER, fontSize: 12 },
  footerCity: { color: '#1e293b', fontSize: 11, marginTop: 4 },
});
