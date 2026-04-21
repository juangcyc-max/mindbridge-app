import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

function TabIcon({ name, color, size, focused }: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string; size: number; focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons name={name} size={size - 2} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#080f1e',
          borderTopWidth: 1,
          borderTopColor: '#1e293b',
          paddingBottom: 10,
          paddingTop: 8,
          height: 68,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#334155',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) =>
            <TabIcon name="home-outline" color={color} size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat IA',
          tabBarIcon: ({ color, size, focused }) =>
            <TabIcon name="chatbubble-ellipses-outline" color={color} size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contacto',
          tabBarIcon: ({ color, size, focused }) =>
            <TabIcon name="mail-outline" color={color} size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Presupuesto',
          tabBarIcon: ({ color, size, focused }) =>
            <TabIcon name="calculator-outline" color={color} size={size} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Soporte',
          tabBarIcon: ({ color, size, focused }) =>
            <TabIcon name="shield-checkmark-outline" color={color} size={size} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 38, height: 28, alignItems: 'center', justifyContent: 'center',
    borderRadius: 8,
  },
  iconWrapActive: {
    backgroundColor: '#10b98120',
  },
});
