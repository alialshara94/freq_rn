import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Tabs from "./components/Tabs";
import { I18nManager } from "react-native";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
export default App;