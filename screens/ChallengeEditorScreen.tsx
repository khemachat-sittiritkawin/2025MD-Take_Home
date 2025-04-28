import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import { TimeDisplayer } from "../components/TimeDisplayer";
import { useRef, useState } from "react";
import { saveChallenges, TaskData } from "../utils";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { EditorTask } from "../components/EditorTask";

export interface ChallengeEditorScreenProps {

};

export function ChallengeEditorScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {

    let [challengeTitle, setChallengeTitle] = useState("No Name");
    const [tasks, setTasks] = useState<TaskData[]>([]);

    return <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE9' }}>
        <StatusBar backgroundColor="#E3CAA5" barStyle="dark-content" />
        <View style={{ backgroundColor: '#AD8B73', padding: 8, flexDirection: 'row', paddingHorizontal: 13 }}>
            <TextInput style={[styles.textField, styles.titleTextField]} onChangeText={(text) => setChallengeTitle(text)} value={challengeTitle} />
            <View style={{ justifyContent: 'space-around' }}>
                <TimeDisplayer seconds={0} />
            </View>
        </View>

        <FlatList style={{ padding: 10 }}
            data={tasks}
            renderItem={({ item, index }) =>
                <EditorTask
                    timeLeft={item.timeLeft}
                    defaultText={item.title}
                    onChangeTitle={newTitle => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index] = new TaskData(newTitle, updatedTasks[index].timeLeft);
                        setTasks(updatedTasks);
                    }}
                    onChangeTime={newTime => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index] = new TaskData(updatedTasks[index].title, newTime);
                        setTasks(updatedTasks);
                    }}
                    onAddAbove={() => {
                        const updatedTasks = [...tasks];
                        updatedTasks.splice(index, 0, new TaskData("No Name", 0));
                        setTasks(updatedTasks);
                    }}
                    onAddBelow={() => {
                        const updatedTasks = [...tasks];
                        updatedTasks.splice(index + 1, 0, new TaskData("No Name", 0));
                        setTasks(updatedTasks);
                    }}
                    onMoveUp={() => {
                        if (index > 0) {
                            const updatedTasks = [...tasks];
                            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
                            setTasks(updatedTasks);
                        }
                    }}
                    onMoveDown={() => {
                        if (index < tasks.length - 1) {
                            const updatedTasks = [...tasks];
                            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
                            setTasks(updatedTasks);
                        }
                    }}
                    onDelete={() => {
                        const updatedTasks = tasks.filter((_, i) => i !== index);
                        setTasks(updatedTasks);
                    }}

                />}
        />

        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <TouchableOpacity
                style={styles.buttons}
                onPress={() => {

                }}
            >
                <MaterialIcons name="save" size={24} color='#FFFBE9' />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                    setTasks([...tasks, new TaskData("No Name", 0)])
                }}
            >
                <Text style={{ fontSize: 30, color: '#FFFBE9' }}>+</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    textField: {
        backgroundColor: '#FFFBE9', flex: 1, marginRight: 10, padding: 2, borderRadius: 5, borderWidth: 3, borderStyle: 'dashed', borderColor: '#5C4033',
    },
    buttons: {
        backgroundColor: '#AD8B73',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10,
    },
    titleTextField: {
        fontSize: 25,
        fontWeight: 'bold'
    },
});
//{ fontSize: 25, fontWeight: 'bold', color: '#FFFBE9' }