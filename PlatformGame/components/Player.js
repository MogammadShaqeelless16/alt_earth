import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Player({ position }) {
  return (
    <View style={[styles.player, { left: position.x, top: position.y }]} />
  );
}

const styles = StyleSheet.create({
  player: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
