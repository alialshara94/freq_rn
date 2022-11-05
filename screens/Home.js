import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { appColors } from '../appColors';
import { Container } from "../components/container";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
import { responsiveFontSize } from "react-native-responsive-dimensions";


export const Home = (props) => {

  const [fontsLoaded] = useFonts({
    'Lateef': require('../assets/fonts/Lateef-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Container>
      <View onLayout={onLayoutRootView} style={style.screenContainer} >
        <View style={style.titleContainer} >
          <Text style={style.titleText} >IQ Bands</Text>
        </View>
        <View style={style.dataContainer} >
          <View>
            <View style={style.iconContainer} >
              <Image
                source={require("../assets/cmc.png")}
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            </View>
            <View style={style.engTxtContainer} >
              <Text style={style.engText} >Republic of Iraq</Text>
              <Text style={style.engText} >Communication & Media Commission</Text>
              <Text style={style.engText} >National Frequency Allocation Table</Text>
            </View>
            <View style={style.arTxtContainer}>
              <Text style={style.arText} >صادرة بموجب قرار مجلس المفوضين ذي العدد 2021 /ق 38 </Text>
              <Text style={style.arText} >في 6 / 5 / 2021</Text>
            </View>
          </View>
          <View>
            <View style={style.footerContainer} >
              <Text style={style.footerTxt} >IQ Bands designed by
                <Text
                  style={{ color: appColors.btnPrimary, }}
                // onPress={() => Linking.openURL('')}
                > DOTE IT Team</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: appColors.main
  },
  titleContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: appColors.text
  },
  dataContainer: {
    height: '90%',
    backgroundColor: appColors.container,
    paddingTop: '5%',
    paddingBottom: '15%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'space-between'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  engTxtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
    width: '100%',
  },
  arTxtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
    width: '100%',
  },
  engText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    color: appColors.text
  },
  arText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Lateef',
    color: appColors.text
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footerTxt: {
    color: appColors.btnSecondary
  }
});