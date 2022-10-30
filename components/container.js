import { SafeAreaView } from "react-native-safe-area-context"
import Colors from '../app-colors.json';

export const Container = (props) => {
    return(
        <SafeAreaView style={{backgroundColor:Colors.color1}} >
            {props.children}
        </SafeAreaView>
    )
}