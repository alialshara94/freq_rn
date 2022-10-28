import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Table } from "../screens/Table";
import { Home } from "../screens/Home";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const slide = useRef(new Animated.Value(0)).current;
  const [isOpened, setIsOPened] = useState(false);
  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOPened(true);
  };
  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setIsOPened(false);
  };
  const TabBarSearchBtn = ({ children, onPress }) => {
    const onBtnPress = () => {
      slideDown();
      onPress();
    };
    return (
      <TouchableOpacity
        onPress={onBtnPress}
        style={{
          top: -30,
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
            backgroundColor: "#e32f45",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
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
                  resizeMethod="scale"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
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
                  resizeMethod="scale"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          }
        },
        headerShadowVisible: false,
        headerShown:
          route.name == "Home" || route.name == "Search" ? true : false,
        headerBackgroundContainerStyle: { backgroundColor: "gray" },
        header: () => {
          return (
            <Animated.View
              style={{
                height: slide,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text>Search Area</Text>
              {isOpened ? (
                <Pressable 
                style={{ marginBottom: -5 }}
                onPress={slideUp}
                >
                  <Image
                    source={require("../assets/remove.png")}
                    resizeMethod="scale"
                    style={{
                      width: 100,
                      height: 10,
                      tintColor: "#e32f45",
                    }}
                  />
                </Pressable>
              ) : null}
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/search.png")}
              resizeMethod="scale"
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <TabBarSearchBtn {...props} />,
        }}
      />
      <Tab.Screen name="Table" component={Table} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
