import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function OpeningVideo({ onDone }: { onDone: () => void }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [active, setActive] = useState(true);

  const player = useVideoPlayer(require('../assets/videoopen.mp4'), p => {
    p.muted = true;
    p.loop = false;
    p.play();
  });

  useEffect(() => {
    const fadeOut = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setActive(false);
        onDone();
      });
    }, 8000);

    return () => clearTimeout(fadeOut);
  }, []);

  if (!active) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 9999, opacity: fadeAnim, backgroundColor: '#000' }]}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        nativeControls={false}
      />
    </Animated.View>
  );
}
