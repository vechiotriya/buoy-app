import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { scale } from '../utils/scale';

export const ProgressBar = ({ progress = 0, color = '#1E85B7', height = scale(10) }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,        // 0 to 1
      duration: 400,
      useNativeDriver: false,   // width can't use native driver
    }).start();
  }, [progress]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ height, backgroundColor: 'rgba(120,120,120,0.2)', borderRadius: height / 2, overflow: 'hidden' }}>
      <Animated.View style={{ height, width, backgroundColor: progress>1?'#FF383C': color, borderRadius: height / 2 }} />
    </View>
  );
};