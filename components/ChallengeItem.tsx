import { useNavigation } from "@react-navigation/native";
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChallengeData, TaskData } from "../utils";



export function ChallengeItem(props: {data: ChallengeData}) {
    let nav = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

    return (<TouchableOpacity style={styles.button}
        onPress={() => nav.navigate("Challenge", { challenge: props.data })}
    >
        <Text style={styles.text}>{props.data.title}</Text>
        <View style={{ marginTop: 3, flexDirection: 'row' }}>
            <Text style={styles.infoText}>Tasks: {props.data.tasks.length},</Text>
            <Text style={styles.infoText}>Total time: {props.data.calculateTotalTime()}s,</Text>
            <Text style={styles.infoText}>Average : {props.data.calculateAverageTime().toFixed(1)}s</Text>
        </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    button: { backgroundColor: '#E3CAA5', padding: 10, borderRadius: 5, marginBottom: 10 },
    text: { fontSize: 25, fontWeight: 'bold', color: '#5C4033' }, // Darker brown for better contrast
    infoText: { color: '#5C4033', fontSize: 16, marginRight: 5},
});