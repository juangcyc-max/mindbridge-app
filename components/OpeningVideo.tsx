import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function OpeningVideo({ onDone }: { onDone: () => void }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [active, setActive] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = useVideoPlayer(require('../assets/videoopen.mp4'), (p: any) => {
    p.muted = true;
    p.loop = false;
    p.showNowPlayingNotification = false;
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
