import { Text, View } from "react-native";

export const Home = (props) => {
  return (
    <>
      <View style={{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        height: '79.5%'
      }} >
        <Text>Home</Text>
      </View>
      <View style={{
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        height: '20.5%'
      }} >
        <Text>Home</Text>
      </View>
    </>
  );
};
