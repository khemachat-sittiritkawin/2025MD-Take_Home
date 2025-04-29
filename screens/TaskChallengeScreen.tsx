import { FlatList, Modal, StatusBar, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { TaskItem } from '../components/TaskItem';
import { TimeDisplayer } from '../components/TimeDisplayer';
import { ChallengeData } from '../utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useRoute } from '@react-navigation/native';

export type TaskChallengeScreenProps = {
    challenge: ChallengeData;
};

export function TaskChallengeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {

    const route = useRoute();
    const { challenge } = (route.params as TaskChallengeScreenProps);

    const [timeTaken, setTimeTaken] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [taskData, setTaskData] = useState(challenge.getTasks());
    const [selectionIndex, setSelectionIndex] = useState(0);

    useEffect(() => {
        if (!isRunning) return;
        if (selectionIndex >= taskData.length) {
            setIsDone(true);
        } else {
            const interval = setInterval(() => {
                setTimeTaken((prev) => {
                    return prev + 1;
                })
                setTaskData((prevTasks) =>
                    prevTasks.map((task, index) => {
                        if (index === selectionIndex) {
                            task.decrementTime();
                        }
                        return task;
                    })
                );
            }, 1000); // Update every second

            return () => clearInterval(interval); // Cleanup interval on unmount or when selectionIndex changes
        }
    }, [selectionIndex, isRunning]); // Re-run effect when selectionIndex changes


    function onRestart() {
        setTimeTaken(0);
        setIsStarted(false);
        setIsRunning(false);
        setIsDone(false);
        setTaskData(challenge.getTasks());
        setSelectionIndex(0);
    }

    function onTaskFinished() {
        setSelectionIndex(selectionIndex + 1);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE9' }}>
            <StatusBar backgroundColor="#E3CAA5" barStyle="dark-content" />

            <Modal
                transparent={true}
                visible={isDone}
                animationType="fade"
                onRequestClose={() => onRestart()}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker transparent background for better focus
                }}>
                    <View style={{
                        backgroundColor: '#FFFBE9',
                        padding: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 10, // For Android shadow
                    }}>
                        <FontAwesome
                            name="trophy"
                            size={50}
                            color="#AD8B73"
                            style={{ marginBottom: 15 }}
                        />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#AD8B73',
                            marginBottom: 10,
                            textAlign: 'center',
                        }}>
                            Congratulations!
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#5C4033',
                            marginBottom: 20,
                            textAlign: 'center',
                        }}>
                            You completed all tasks in {timeTaken} seconds!
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#AD8B73',
                                paddingVertical: 12,
                                paddingHorizontal: 25,
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                            onPress={onRestart}
                        >
                            <Text style={{
                                color: '#FFFBE9',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>Restart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ backgroundColor: '#AD8B73', padding: 8, flexDirection: 'row', paddingHorizontal: 13 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFBE9' }}>{challenge.title}</Text>
                <TimeDisplayer seconds={timeTaken} />
            </View>

            <FlatList style={{ padding: 10 }}
                data={taskData}
                renderItem={({ item, index }) => <TaskItem title={item.title} timeLeft={item.timeLeft} selected={index === selectionIndex} />}
                keyExtractor={item => item.title}
            />

            <View style={{ marginTop: 'auto', margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: isStarted ? '#AD8B73' : '#D3D3D3',
                            padding: 13,
                            marginBottom: 5,
                            borderRadius: 5,
                        }}
                        onPress={isStarted ? onRestart : undefined}
                        disabled={!isStarted}
                    >
                        <FontAwesome name="refresh" size={25} color={isStarted ? "#FFFBE9" : "#A9A9A9"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: isStarted ? '#AD8B73' : '#D3D3D3',
                            padding: 13,
                            marginBottom: 5,
                            marginLeft: 'auto',
                            borderRadius: 5,
                        }}
                        onPress={isStarted ? () => setIsRunning(!isRunning) : undefined}
                        disabled={!isStarted}
                    >
                        {isRunning
                            ? <FontAwesome6 name="pause" size={25} color={isStarted ? "#FFFBE9" : "#A9A9A9"} />
                            : <FontAwesome6 name="play" size={25} color={isStarted ? "#FFFBE9" : "#A9A9A9"} />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ backgroundColor: '#AD8B73', padding: 60, borderRadius: 5 }}
                    onPress={() => {
                        if (isStarted) {
                            onTaskFinished();
                        } else {
                            setIsRunning(true);
                            setIsStarted(true);
                        }
                    }}
                >
                    <Text style={{ fontSize: 25, textAlign: 'center', color: '#FFFBE9' }}>
                        {isStarted ? "Finish" : "Start"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
