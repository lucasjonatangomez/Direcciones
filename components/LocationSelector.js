import * as Location from 'expo-location';

import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { COLORS } from '../constants';
import { MapPreview } from './MapPreview';

const LocationSelector = props => {
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesita dar permisos de la localizacion para usar la aplicación',
        [{ text: 'Ok' }],
      )

      return false;
    }

    return true;
  }

  const handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;

    const location = await Location.getCurrentPositionAsync({
      timeout:5000,
    })

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>Ubicacion en proceso...</Text>
      </MapPreview>
      <Button
        title="Obtener Ubicacion"
        color={COLORS.LIGTH_PINK}
        onPress={handleGetLocation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.BLUSH,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default LocationSelector;