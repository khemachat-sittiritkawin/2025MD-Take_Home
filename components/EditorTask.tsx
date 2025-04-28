import { FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TimeDisplayer } from "../components/TimeDisplayer";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";

export function EditorTask(props: {
    timeLeft: number,
    defaultText: string,
    onChangeTitle: (val: string) => void,
    onChangeTime: (val: number) => void,
    onAddAbove: () => void,
    onAddBelow: () => void,
    onMoveUp: () => void,
    onMoveDown: () => void,
    onDelete: () => void,
}) {
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    const [isTimeInputVisible, setTimeInputVisible] = useState(false);

    const toggleOptions = () => setOptionsVisible(!isOptionsVisible);
    const toggleTimeInput = () => setTimeInputVisible(!isTimeInputVisible);

    return (<View style={styles.container}>
        <View style={styles.leftContainer}>
            <TextInput style={styles.textInput} onChangeText={props.onChangeTitle} defaultValue={props.defaultText} />
            <TouchableOpacity style={styles.timeButton}>
                <TimeDisplayer seconds={props.timeLeft} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.moreOptions} onPress={toggleOptions}>
            <MaterialIcons name="more-vert" size={24} color="#FFFBE9" />
        </TouchableOpacity>

        <Modal
            transparent={true}
            visible={isOptionsVisible}
            animationType="fade"
            onRequestClose={toggleOptions}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={toggleOptions}>
                <View style={styles.optionsWidget}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onAddAbove(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Add Above</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onAddBelow(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Add Below</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onMoveUp(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Move Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onMoveDown(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Move Down</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { borderBottomWidth: 0 }]} onPress={() => { props.onDelete(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <TimeInputOverlay visible={true} onRequestClose={toggleTimeInput} />

    </View>);
}

const useCounter = (
    onCarry: (reversed: boolean) => boolean,
    initialValue: number,
    maxValue?: number
): [number, (reversed?: boolean) => void] => {
    const [value, setValue] = useState(initialValue);

    const increment = (reversed?: boolean) => {
        setValue((prev) => {
            const dir = reversed ? -1 : 1;
            const next = prev + dir;

            if (maxValue !== undefined) {
                if (next > maxValue && onCarry(false)) return 0; // Reset to 0 if max is exceeded
                if (next < 0 && onCarry(true)) return maxValue; // Reset to max if below 0
            }

            return Math.max(0, Math.min(next, maxValue ?? next)); // Clamp value within bounds
        });
    };

    return [value, increment];
};

function TimeInputOverlay(props: { visible: boolean, onRequestClose: () => void }) {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    return (<Modal
        transparent={true}
        visible={props.visible}
        animationType="fade"
        onRequestClose={props.onRequestClose}
    >

        <View style={styles.modalOverlay}>
            <View style={{ backgroundColor: "#FFFBE9", padding: 10, borderRadius: 5, alignContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 20 }}>Select Time or smth</Text>
                <View style={{ flexDirection: 'row'}}>
                    <NumberDigit value={hours} maxValue={99} onStep={(decr) => 
                        setHours((prev) => Math.min(99, Math.max(0, hours + (decr ? -1 : 1))))
                    }/>
                    <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 60, textAlignVertical: 'center' }}>:</Text>
                    <NumberDigit value={minutes} maxValue={59} onStep={(decr) => 
                        setMinutes((prev) => Math.min(59, Math.max(0, minutes + (decr ? -1 : 1))))
                    }/>
                    <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 60, textAlignVertical: 'center' }}>:</Text>
                    <NumberDigit value={seconds} maxValue={59} onStep={(decr) => 
                        setSeconds((prev) => Math.min(59, Math.max(0, seconds + (decr ? -1 : 1))))
                    }/>
                </View>
            </View>
        </View>
    </Modal>);
}

function NumberDigit(props: { value: number, maxValue: number, onStep: (decrement: boolean) => void }) {
    return (
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity
                onPress={() => props.onStep(false)}
                style={{
                    backgroundColor: '#AD8B73',
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontWeight: 'bold', color: '#FFFBE9', fontSize: 20, textAlign: 'center' }}>+</Text>
            </TouchableOpacity>
            <TextInput
                style={{
                    fontWeight: 'bold',
                    color: '#5C4033',
                    fontSize: 40,
                    borderWidth: 3,
                    borderColor: '#5C4033',
                    borderRadius: 5,
                    textAlign: 'center',
                    paddingVertical: 5,
                    backgroundColor: '#FFFBE9',
                    width: 60,
                }}
                value={String(Math.min(props.value, props.maxValue)).padStart(Math.floor(Math.log10(props.maxValue)) + 1, '0')}
                editable={false} // Prevent manual editing
                
            />
            <TouchableOpacity
                onPress={() => props.onStep(true)}
                style={{
                    backgroundColor: '#AD8B73',
                    borderRadius: 5,
                    padding: 5,
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontWeight: 'bold', color: '#FFFBE9', fontSize: 20, textAlign: 'center' }}>-</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row' },
    leftContainer: {
        flexDirection: 'row', backgroundColor: '#E3CAA5', borderRadius: 5, alignItems: 'center', padding: 8, paddingHorizontal: 12, marginVertical: 5,
        borderColor: '#AD8B73',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        flex: 1,
    },
    textInput: {
        backgroundColor: '#FFFBE9', flex: 1, marginRight: 10, padding: 2, borderRadius: 5, borderWidth: 3, borderStyle: 'dashed', borderColor: '#5C4033',
        fontSize: 16,
    },
    timeButton: { borderRadius: 5, borderWidth: 3, borderStyle: 'dashed', borderColor: '#5C4033' },
    moreOptions: {
        backgroundColor: '#AD8B73', borderRadius: 5, marginVertical: 5, justifyContent: 'center',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsWidget: {
        backgroundColor: '#FFFBE9',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 200, // Adjust width as needed
    },
    optionButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E3CAA5',
    },
    optionText: {
        fontSize: 16,
        color: '#5C4033',
    },
})