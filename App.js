import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View, Text, BackHandler, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { block } from 'react-native-reanimated';


const Stack = createStackNavigator();


// Criei aqui 2 componentes screens
function Home({ navigation }) {

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={ () => { navigation.navigate('Info') } }>
        <Text style={{ color: "#111", textAlign: "center", fontWeight: "bold" }}> WebView </Text>
      </TouchableOpacity>

    </View>
  );
};


function Info() {

  return (
    <View style={styles.containerW}>

      <WebviewUi /> 

    </View>
  );
};

// criei aqui um componente webview personalizado para a navegação nativa do android
function WebviewUi(){


  const webref = useRef(null);
  const navigation = useNavigation();


  function webViewGoBack(props) {

      if( props.canGoBack )
      {

          BackHandler.addEventListener("hardwareBackPress", () => {
              webref.current.goBack();
              return true;
          });

      }

      else if( !props.canGoBack ) 
      {

          BackHandler.addEventListener("hardwareBackPress", () => {

            navigation.navigate("Home");

            BackHandler.addEventListener("hardwareBackPress", () => {
                BackHandler.exitApp();
            });

            return true;
        
          });           
      };

  };



  return (
      
      <WebView 
        onNavigationStateChange={webViewGoBack}
        source={{ uri: 'https://reactnative.dev/' }} 
        ref={webref}
      />

    );
};






export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Info" component={Info} />
 
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10
  },

  containerW: {
    flex: 1
  },

  button: {
    backgroundColor: "#888",
    width: "100%",
    padding: 20,
  },
});
