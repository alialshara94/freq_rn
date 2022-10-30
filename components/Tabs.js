import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Table } from "../screens/Table";
import { Home } from "../screens/Home";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from "react-native";
import { useEffect, useRef, useState } from "react";
import Colors from '../app-colors.json';
import { Container } from "./container";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const navigation = useNavigation()
  const route = useRef(undefined);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const slide = useRef(new Animated.Value(0)).current;

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 100,
      duration: 300,
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
          top: keyboardStatus ? 0 : -30,
          justifyContent: "center",
          alignItems: "center",
          ...style.shadow,
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: Colors.color2,
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
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
  }, []);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor:Colors.color1
      }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: keyboardStatus ? 0 : 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: Colors.color1,
          borderRadius: 15,
          height: 90,
          ...style.shadow,
        },
        tabBarIcon: ({ focused }) => {
          if (route.name == "Table") {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../assets/tablet.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? Colors.color2 : Colors.color3,
                  }}
                />
                <Text
                  style={{
                    color: focused ? Colors.color2 : Colors.color3,
                    fontSize: 12,
                  }}
                >
                  Table
                </Text>
              </View>
            );
          } else if (route.name == "Home") {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../assets/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? Colors.color2 : Colors.color3,
                  }}
                />
                <Text
                  style={{
                    color: focused ? Colors.color2 : Colors.color3,
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
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
                marginBottom: -35,
                backgroundColor: Colors.color1,
              }}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 4,
                borderWidth: 1,
                borderColor: Colors.color3,
                borderRadius: 10,
                margin: 5
              }} >
                <TextInput
                  placeholder="Search.."
                  style={{
                    width: '93%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Image
                  source={require("../assets/search2.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Colors.color3,
                  }}
                />
              </View>
              <Pressable
                style={{
                  paddingVertical: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:"rgba(0,0,0,0)"
                }}
                onPress={slideUp}
              >
                <View
                  style={{
                    width: 80,
                    height: 5,
                    backgroundColor: Colors.color3,
                    borderRadius: 10
                  }}
                ></View>
              </Pressable>
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        listeners={{
          tabPress: () => {
            slideUp();
          }
        }}
      >
        {(props) => {
          return (
            <Container>
              <Home {...props} />
            </Container>
          )
        }}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/search.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: Colors.color1,
              }}
            />
          ),
          tabBarButton: (props) => {
            props["keyboardStatus"] = keyboardStatus;
            return < TabBarSearchBtn {...props} />
          },
        }}
      >{() => null}</Tab.Screen>
      <Tab.Screen
        name="Table"
      >
        {(props) => {
          return (
            <Container>
              <Table {...props} />
            </Container>
          )
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: Colors.color4,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
});

export default Tabs;
