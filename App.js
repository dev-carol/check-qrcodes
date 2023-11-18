import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    marginTop: window.height * 0.1,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: "bold",
    color: "#008F7A",
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 8,
    color: "#acacac",
  },
  image: {
    marginTop: 16,
    width: 100,
    height: 200,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 16,
  },
  camera: {
    width: window.width * 0.6,
    height: window.height * 0.5,
  },
  linkOverlay: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    color: "#008CCA",
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },

});

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
  };

  const resetScanner = () => {
    setScannedData(null);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Check QrCodes</Text>
        <Text style={styles.subtitle}>Aponte a câmera para um QR Code</Text>
        <Image
          source={require("./assets/logo.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
        {scannedData && (
          <View style={styles.linkOverlay}>
            <Text style={styles.linkText}>{scannedData}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={resetScanner}
          style={{ borderColor: "#008F7A" }}
          labelStyle={{ color: '#008F7A', fontFamily: 'Roboto' }}
          >
          Escanear Novamente
        </Button>
      </View>
    </View>
  );
}