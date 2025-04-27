import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChallengeData } from "../utils";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function ChallengeItem(props: { data: ChallengeData, onPress: () => void, selected: boolean }) {
    let nav = useNavigation<NativeStackScreenProps<RootStackParamList>["navigation"]>();

    return (<View style={styles.container}>
        <TouchableOpacity style={[styles.button, props.selected ? { borderWidth: 4, padding: 10 - 4, borderColor: '#5C4033' } : {}]}
            onPress={props.onPress}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>{props.data.title}</Text>
                <View style={{ marginTop: 3, flexDirection: 'row' }}>
                    <Text style={styles.infoText}>Tasks: {props.data.tasks.length},</Text>
                    <Text style={styles.infoText}>Total time: {props.data.calculateTotalTime()}s,</Text>
                    <Text style={styles.infoText}>Average : {props.data.calculateAverageTime().toFixed(1)}s</Text>
                </View>
            </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10, justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ backgroundColor: '#AD8B73', borderRadius: 5}}>
                <MaterialIcons name="edit" size={24} color="#5C4033" />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#AD8B73', borderRadius: 5 }}>
                <MaterialCommunityIcons name="trash-can" size={24} color="#5C4033" />
            </TouchableOpacity>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E3CAA5',
        // padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        flex: 1,

    },
    button: {
        //backgroundColor: 'green',
        paddingRight: 'auto',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    text: { fontSize: 25, fontWeight: 'bold', color: '#5C4033' }, // Darker brown for better contrast
    infoText: { color: '#5C4033', fontSize: 16, marginRight: 5 },
});