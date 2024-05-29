import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImageCropPicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const camera = useRef();

  const handleTakePicture = async () => {
    try {
      if (camera) {
        const options = {
          quality: 0.5,
        };
        const data = await camera.current.takePictureAsync(options);
        console.log(data);
        const imageData = await ImageCropPicker.openCropper({
          path: data.uri,
          width: 250,
          height: 250,
          cropperActiveWidgetColor: 'red',
          cropperToolbarColor: 'green',
          cropperToolbarWidgetColor: 'blue',
          cropperToolbarTitle: 'Crop Image',
          disableCropperColorSetters: true,
          freeStyleCropEnabled: true,
          compressImageMaxWidth: 350,
          compressImageMaxHeight: 350,
          showCropGuidelines: true,
          hideBottomControls: true,
          enableRotationGesture: true,
        });
        console.log('image data goes here');
        console.log(imageData);
        setImage(imageData.path);
        setVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera ref={camera} style={styles.preview} captureAudio={false} />

      <View style={styles.buttonContainer}>
        <Button title="Capture" onPress={() => handleTakePicture()} />
      </View>

      <Modal visible={visible} animationType="slide">
        <View style={{flex: 1}}>
          {image.length > 0 && (
            <Image
              source={{uri: image}}
              style={{
                width: 400,
                height: 400,
              }}
              resizeMode="cover"
            />
          )}

          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
  },
});

export default HomeScreen;
