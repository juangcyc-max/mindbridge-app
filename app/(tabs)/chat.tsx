import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://mindbride.net/api/chat';

type Message = { role: 'user' | 'assistant'; content: string; ts: number };

const GREETING: Message = {
  role: 'assistant',
  content: 'Hola 👋 Soy MI3.0, el asistente de Mindbridge IA.\n\nEstoy aquí para ayudarte a encontrar la solución digital ideal para tu negocio — web, automatización cloud e IA integrada.\n\n¿Cuéntame, qué tipo de negocio tienes?',
  ts: Date.now(),
};

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [incidentDetected, setIncidentDetected] = useState(false);
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [incidentForm, setIncidentForm] = useState({ name: '', email: '' });
  const [incidentSending, setIncidentSending] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const sessionId = useRef(`session-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, typing]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Message = { role: 'user', content: text, ts: Date.now() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setTyping(true);

    try {
      const apiMessages = history
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, sessionId: sessionId.current, conversationId }),
      });

      const data = await res.json();
      if (data.conversationId && !conversationId) setConversationId(data.conversationId);
      if (data.incidentDetected && data.incidentId && !incidentDetected) {
        setIncidentDetected(true);
        setIncidentId(data.incidentId);
      }

      setTyping(false);

      const reply = data.text || 'El servicio no está disponible ahora. Escríbenos a juangutierrezdelaconcha@mindbride.net';
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: Date.now() }]);
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'El servicio no está disponible ahora mismo. Contáctanos en juangutierrezdelaconcha@mindbride.net',
        ts: Date.now(),
      }]);
    }
  }, [input, typing, messages, conversationId, incidentDetected]);

  async function submitIncident() {
    if (!incidentId || !incidentForm.email.includes('@')) return;
    setIncidentSending(true);
    try {
      await fetch('https://mindbride.net/api/chat/incident-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId, name: incidentForm.name, email: incidentForm.email }),
      });
      setIncidentSubmitted(true);
    } catch {
      // silent
    } finally {
      setIncidentSending(false);
    }
  }

  function clearChat() {
    setMessages([GREETING]);
    setConversationId(null);
    setIncidentDetected(false);
    setIncidentId(null);
    setIncidentSubmitted(false);
    setIncidentForm({ name: '', email: '' });
  }

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Image source={require('../../assets/icon.png')} style={styles.avatarImg} />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>MI3.0 · Mindbridge</Text>
            <Text style={styles.headerSub}>Responde en tu idioma</Text>
          </View>
        </View>
        <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
          <Ionicons name="trash-outline" size={20} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.msgRow, item.role === 'user' ? styles.msgRowUser : styles.msgRowAI]}>
            <View style={[styles.bubble, item.role === 'user' ? styles.bubbleUser : styles.bubbleAI]}>
              <Text style={[styles.bubbleText, item.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextAI]}>
                {item.content}
              </Text>
            </View>
            <Text style={styles.ts}>{formatTime(item.ts)}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            {typing && (
              <View style={styles.msgRowAI}>
                <View style={styles.bubbleAI}>
                  <View style={styles.typingDots}>
                    {[0, 1, 2].map(i => (
                      <View key={i} style={styles.dot} />
                    ))}
                  </View>
                </View>
              </View>
            )}
            {incidentDetected && !incidentSubmitted && (
              <View style={styles.incidentPanel}>
                <Text style={styles.incidentTitle}>Hemos registrado tu incidencia</Text>
                <Text style={styles.incidentSub}>Déjanos tu email para enviarte confirmación:</Text>
                <TextInput
                  style={styles.incidentInput}
                  placeholder="Tu nombre"
                  placeholderTextColor="#475569"
                  value={incidentForm.name}
                  onChangeText={v => setIncidentForm(f => ({ ...f, name: v }))}
                />
                <TextInput
                  style={styles.incidentInput}
                  placeholder="tu@email.com"
                  placeholderTextColor="#475569"
                  value={incidentForm.email}
                  onChangeText={v => setIncidentForm(f => ({ ...f, email: v }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={[styles.incidentBtn, (!incidentForm.email.includes('@') || incidentSending) && { opacity: 0.5 }]}
                  onPress={submitIncident}
                  disabled={!incidentForm.email.includes('@') || incidentSending}
                >
                  <Text style={styles.incidentBtnText}>{incidentSending ? 'Enviando...' : 'Enviar'}</Text>
                </TouchableOpacity>
              </View>
            )}
            {incidentSubmitted && (
              <View style={styles.incidentSuccess}>
                <Ionicons name="checkmark-circle" size={18} color="#10b981" />
                <Text style={styles.incidentSuccessText}>Confirmación enviada. Juan te contactará pronto.</Text>
              </View>
            )}
          </>
        )}
      />

      {/* Input */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#475569"
          multiline
          maxLength={500}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || typing) && { opacity: 0.4 }]}
          onPress={sendMessage}
          disabled={!input.trim() || typing}
        >
          {typing
            ? <ActivityIndicator size="small" color="#fff" />
            : <Ionicons name="send" size={18} color="#fff" />
          }
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  avatarImg: { width: 40, height: 40, borderRadius: 20 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, backgroundColor: '#10b981', borderRadius: 6, borderWidth: 2, borderColor: '#0f172a' },
  headerTitle: { color: '#f8fafc', fontWeight: '700', fontSize: 15 },
  headerSub: { color: '#10b981', fontSize: 11, fontWeight: '600' },
  clearBtn: { padding: 8 },
  messageList: { padding: 16, gap: 12, paddingBottom: 8 },
  msgRow: { gap: 3 },
  msgRowUser: { alignItems: 'flex-end' },
  msgRowAI: { alignItems: 'flex-start' },
  bubble: { maxWidth: '82%', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleUser: { backgroundColor: '#10b981', borderBottomRightRadius: 4 },
  bubbleAI: { backgroundColor: '#1e293b', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#334155' },
  bubbleText: { fontSize: 14, lineHeight: 22 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextAI: { color: '#e2e8f0' },
  ts: { color: '#334155', fontSize: 10, marginHorizontal: 4 },
  typingDots: { flexDirection: 'row', gap: 4, paddingVertical: 4, paddingHorizontal: 4 },
  dot: { width: 7, height: 7, backgroundColor: '#10b981', borderRadius: 4 },
  incidentPanel: { margin: 8, backgroundColor: '#f59e0b10', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f59e0b30', gap: 10 },
  incidentTitle: { color: '#f59e0b', fontWeight: '700', fontSize: 14 },
  incidentSub: { color: '#94a3b8', fontSize: 12 },
  incidentInput: { backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#334155', fontSize: 13 },
  incidentBtn: { backgroundColor: '#f59e0b', borderRadius: 10, padding: 12, alignItems: 'center' },
  incidentBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 13 },
  incidentSuccess: { flexDirection: 'row', alignItems: 'center', gap: 8, margin: 8, backgroundColor: '#10b98110', borderRadius: 12, padding: 12 },
  incidentSuccessText: { color: '#10b981', fontSize: 13, fontWeight: '600', flex: 1 },
  inputBar: { backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b', paddingHorizontal: 12, paddingTop: 10, flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  input: { flex: 1, backgroundColor: '#1e293b', color: '#f1f5f9', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, maxHeight: 100, borderWidth: 1, borderColor: '#334155' },
  sendBtn: { width: 42, height: 42, backgroundColor: '#10b981', borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginBottom: 1 },
});
