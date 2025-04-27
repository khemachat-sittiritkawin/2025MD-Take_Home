import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

export interface ChallengeEditorScreenProps {

};

export function ChallengeEditorScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
    return <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#E3CAA5" barStyle="dark-content" />
        <Text>Challenge Creator Screen</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        
    },
});