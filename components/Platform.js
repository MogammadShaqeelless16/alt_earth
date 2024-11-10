import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Platform({ position }) {
  return (
    <View style={[styles.platform, { left: position.x, top: position.y }]} />
  );
}

const styles = StyleSheet.create({
  platform: {
    width: '100%',
    height: 20,
    backgroundColor: 'green',
    position: 'absolute',
  },
});
