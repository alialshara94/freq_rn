import { Home } from "../screens/Home";
import { appColors } from '../appColors';
import { Table } from "../screens/Table";
import { Store } from "../screens/zustand";
import { Details } from "../screens/Details";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated, Image, StyleSheet, TextInput, TouchableOpacity, View, Keyboard } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { setSearch, setPage } = Store()
  const navigation = useNavigation()
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const slide = useRef(new Animated.Value(0)).current;

  const HomeComponent = () => { return (<> </>) }

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  
  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const TabBarSearchBtn = ({ children, keyboardStatus }) => {
    const onPress = () => {
      navigation.navigate('Table')
      slideDown();
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          top: keyboardStatus ? 10 : -25,
          ...style.center,
        }}
        activeOpacity={0.8}
      >
        <View
          style={style.searchBtn}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    let start = true
    if (start) {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus(false);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
    return () => start = false
  }, []);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: appColors.main
      }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: appColors.white },
        tabBarIcon: ({ focused }) => {
          if (route.name == "Table") {
            return (
              <View
                style={style.center}
              >
                <Image
                  source={require("../assets/tower.png")}
                  resizeMode="contain"
                  style={{
                    ...style.iconSize,
                    tintColor: focused ? appColors.btnPrimary : appColors.btnSecondary,
                  }}
                />
              </View>
            );
          } else if (route.name == "Home") {
            return (
              <View
                style={style.center}
              >
                <Image
                  source={require("../assets/home1.png")}
                  resizeMode="contain"
                  style={{
                    ...style.iconSize,
                    tintColor: focused ? appColors.btnPrimary : appColors.btnSecondary,
                  }}
                />
              </View>
            );
          }
        },
        header: () => {
          return (
            <Animated.View
              style={{
                height: slide,
                justifyContent: "flex-end",
                marginBottom: -50,
                backgroundColor: appColors.main,
              }}
            >
              <View style={{ ...style.searchBarCont }} >
                <View style={style.searchBarTxtInArea} >
                  <View style={{ width: '10%' }} >
                    <Image
                      source={require("../assets/search.png")}
                      resizeMode="contain"
                      style={{
                        width: "70%",
                        height: "70%",
                        tintColor: appColors.btnSecondary,
                      }}
                    />
                  </View>
                  <View style={{ width: '85%' }} >
                    <TextInput
                      cursorColor={appColors.btnSecondary}
                      placeholder="Search.."
                      placeholderTextColor={appColors.btnSecondary}
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: appColors.white,
                      }}
                      onChangeText={(e) => {
                        setPage(1)
                        setSearch(e)
                      }}
                    />
                  </View>
                </View>
                <View style={style.searchBarIconArea} >
                  <TouchableOpacity
                    style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={slideUp}
                  >
                    <Image
                      source={require("../assets/scroll.png")}
                      resizeMode="contain"
                      style={{
                        width: "100%",
                        height: "100%",
                        tintColor: appColors.btnPrimary,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          );
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          tabPress: () => {
            slideUp();
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeComponent}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/search.png")}
              resizeMode="contain"
              style={{
                ...style.iconSize,
                tintColor: appColors.btnPrimary,
              }}
            />
          ),
          tabBarButton: (props) => {
            props["keyboardStatus"] = keyboardStatus;
            return < TabBarSearchBtn {...props} />
          },
        }}
      />
      <Tab.Screen
        name="Table"
        component={Table}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  searchBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFD460",
    shadowColor: appColors.btnSecondary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconSize: {
    width: 25,
    height: 25,
  },
  searchBarCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchBarTxtInArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: appColors.white,
    borderRadius: 10,
    width: '80%',
    padding: 5
  },
  searchBarIconArea: {
    backgroundColor: appColors.white,
    padding: 9,
    borderRadius: 10,
    width: '12%'
  }
});

export default Tabs;
