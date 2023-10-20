import React, { useEffect, useState } from 'react';
import TimerScreen from './screens/TimerScreen';
import { 
  StatusBar, 
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScaledSize,
} from 'react-native';

export default function App() {

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      const { width, height } = window;
      setScreenWidth(width);
      setScreenHeight(height);
    };

  Dimensions.addEventListener('change', onChange);
  }, []);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    touchBlocker: {
      width: '100%',
      height: 80,

      position: 'absolute',
      left: 0,
    },
  });

  return (
    <View style={styles.container}>
      <TimerScreen />
      <View style={StyleSheet.compose(
        styles.touchBlocker, {
          top: screenHeight < screenWidth ? -40 : -10,
        }
      )} />
      <View style={StyleSheet.compose(
        styles.touchBlocker, {
          top: screenHeight < screenWidth ? screenHeight - 20 : screenHeight - 30,
        }
      )} />
    </View>
  );
}