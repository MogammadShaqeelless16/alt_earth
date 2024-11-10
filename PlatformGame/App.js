import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Player from './components/Player';
import Platform from './components/Platform';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 100 });
  const [isJumping, setIsJumping] = useState(false);
  const [gravity, setGravity] = useState(2);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });

  // Gravity effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPosition(prev => {
        // Check if player hits the platform
        if (prev.y + 50 >= height - 100) {
          return { ...prev, y: height - 150 };
        }
        // Apply gravity if not jumping
        return { ...prev, y: prev.y + gravity };
      });
    }, 20);
    return () => clearInterval(interval);
  }, [gravity]);

  // Update camera offset to center the player
  useEffect(() => {
    setCameraOffset({
      x: -playerPosition.x + width / 2,
      y: -playerPosition.y + height / 2,
    });
  }, [playerPosition]);

  // Player movement functions
  const moveLeft = () => setPlayerPosition(prev => ({ ...prev, x: prev.x - 10 }));
  const moveRight = () => setPlayerPosition(prev => ({ ...prev, x: prev.x + 10 }));
  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setPlayerPosition(prev => ({ ...prev, y: prev.y - 100 }));
      setTimeout(() => setIsJumping(false), 500); // Reset after jump
    }
  };
  const shoot = () => {
    console.log('Shoot!');
    // Shooting functionality can be implemented here
  };

  return (
    <View style={styles.container}>
      <View style={[styles.gameContainer, { transform: [{ translateX: cameraOffset.x }, { translateY: cameraOffset.y }] }]}>
        <Player position={playerPosition} />
        <Platform position={{ x: 0, y: height - 100 }} />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={moveLeft} style={styles.button}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveRight} style={styles.button}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={jump} style={styles.button}>
          <Text style={styles.buttonText}>Jump</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shoot} style={styles.button}>
          <Text style={styles.buttonText}>Shoot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  gameContainer: {
    width: width * 3, // Adjust this to set the size of the environment
    height: height * 2, // Adjust as needed for the environment
    position: 'absolute',
    backgroundColor: '#87CEEB',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#222',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
