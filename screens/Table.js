import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Table = (props) => {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: props.color ? props.color : 'yellow', height: '100%', alignItems: 'center', justifyContent: 'flex-start' }} >
        <Text>ALI NAEEM</Text>
      </View>
    </SafeAreaView>
  );
};
