import { Text, View } from "react-native";

export const Table = (props) => {
  return (
    <View style={{height:'100%', backgroundColor:'yellow'}} >
      <View style={{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        height: '79.5%'
      }} >
        <Text>{props.color ? "Search" : "Table"}</Text>
      </View>
    </View>
  );
};
