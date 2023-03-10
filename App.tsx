/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageProps
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  
  const [image, setImage] = useState<any>(null);
  const [text, setText] = useState<any>("");
  let imgURI =  "";
  
  // useEffect(() => {
  //   launchImageLibrary({
  //     mediaType: 'mixed'
  //   }, setImage)
  
  //   return () => {
      
  //   }
  // }, [])

  useEffect(() => {
    if (image){
      console.log(image.assets[0].uri);
      // imgURI = image[0].uri;

      (async ()=>{
        const result: any = await TextRecognition.recognize(image.assets[0].uri);
        setText(result);
      })();
    }

  
    return () => {
    
    }
  }, [image])
  
  const imageHandler = async ()=>{
try {
  launchImageLibrary({
    mediaType: 'photo'
  },  
  (res)=>{
    if (!res || res.didCancel == true){
      console.log(res);
    }
    else setImage(res);  
  })  
} catch (error) {
  console.log(error)
}


    // if (image){
    //   console.log(image.assets[0].uri);
    //   // imgURI = image[0].uri;

    //   (async ()=>{
    //     const result: any = await TextRecognition.recognize(image.assets[0].uri);
    //     setText(result);
    //   })();
    // }
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          
        <Button title='Click me' onPress={()=>imageHandler()}/>
        
        <Image
        style={styles.logo}
        source={{uri: image ? image.assets[0].uri : "" }}
      />

      <Text>{text ? text: ""}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    width: 300,
    height: 300,
  },
});



export default App;
