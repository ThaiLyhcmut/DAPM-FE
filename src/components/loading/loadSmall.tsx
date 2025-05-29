import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';

type LoadingSpinnerProps = {
  size?: number; // kích thước đường kính spinner, default 50
  color?: string; // màu spinner, default '#3498db'
  style?: ViewStyle;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = '#3498db',
  style,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <ActivityIndicator size={size * 0.8} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
