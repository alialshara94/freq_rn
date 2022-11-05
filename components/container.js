import { SafeAreaView } from "react-native-safe-area-context"
import {appColors} from '../appColors';

export const Container = (props) => {
    return(
        <SafeAreaView style={{backgroundColor:appColors.main}} >
            {props.children}
        </SafeAreaView>
    )
}