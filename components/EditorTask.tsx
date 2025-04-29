import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TimeDisplayer } from "../components/TimeDisplayer";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";



export function EditorTask(props: {
    timeLeft: number,
    defaultText: string,
    onChange: () => void,
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

    return (<View style={styles.container}>
        <View style={styles.leftContainer}>
            <TextInput style={styles.textInput} onChangeText={(s) => {props.onChangeTitle(s); props.onChange();}} defaultValue={props.defaultText} />
            <TouchableOpacity style={styles.timeButton} onPress={() => {
                setTimeInputVisible(true);}}>
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
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onAddAbove(); props.onChange(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Add Above</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onAddBelow(); props.onChange(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Add Below</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onMoveUp(); props.onChange(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Move Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => { props.onMoveDown(); props.onChange(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Move Down</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, { borderBottomWidth: 0 }]} onPress={() => { props.onDelete(); props.onChange(); setOptionsVisible(false); }}>
                        <Text style={styles.optionText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <TimeInputOverlay initialValue={props.timeLeft} visible={isTimeInputVisible} onRequestClose={() => setTimeInputVisible(false)} onSubmit={(secs) => {props.onChangeTime(secs); props.onChange(); setTimeInputVisible(false);}}/>
    </View>);
}

const useCounter = (
    onCarry: (reversed: boolean) => boolean,
    initialValue: number,
    maxValue?: number
): [number, (reversed?: boolean) => void, (value: React.SetStateAction<number>) => void] => {
    const [value, setValue] = useState(initialValue);

    const increment = (reversed?: boolean) => {
        setValue((prev) => {
            const dir = reversed ? -1 : 1;
            const next = prev + dir;

            if (maxValue !== undefined) {
                if (next > maxValue && onCarry(false)) return 0;
                if (next < 0 && onCarry(true)) return maxValue;
            }

            return Math.max(0, Math.min(next, maxValue ?? next));
        });
    };

    return [value, increment, setValue];
};

function TimeInputOverlay(props: { initialValue: number, visible: boolean, onRequestClose: () => void, onSubmit: (seconds: number) => void }) {
    const [hours, incrementHours, setHours] = useCounter(() => true, 0, 99);
    const [minutes, incrementMinutes, setMinutes] = useCounter(() => true, 0, 59);
    const [seconds, incrementSeconds, setSeconds] = useCounter(() => true, 0, 59);

    useEffect(() => {
        let kerty = props.initialValue;
        setSeconds(() => kerty % 60);
        kerty = Math.floor(kerty / 60);
        setMinutes(() => kerty % 60);
        kerty = Math.floor(kerty / 60);
        setHours(() => Math.min(kerty, 99));
    }, [props.initialValue, props.visible]);

    return (
        <Modal
            transparent={true}
            visible={props.visible}
            animationType="fade"
            onRequestClose={props.onRequestClose}
        >
            <View style={styles.modalOverlay}>
                <View style={{ backgroundColor: "#FFFBE9", padding: 20, borderRadius: 10, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 20, marginBottom: 20 }}>Select Time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <NumberDigit value={hours} maxValue={99} onStep={(decr) => incrementHours(decr)} onChange={(val) => setHours(val)} />
                        <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 60 }}>:</Text>
                        <NumberDigit value={minutes} maxValue={59} onStep={(decr) => incrementMinutes(decr)} onChange={(val) => setMinutes(val)} />
                        <Text style={{ fontWeight: 'bold', color: "#5C4033", fontSize: 60 }}>:</Text>
                        <NumberDigit value={seconds} maxValue={59} onStep={(decr) => incrementSeconds(decr)} onChange={(val) => setSeconds(val)} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <TouchableOpacity style={{ backgroundColor: '#AD8B73', borderRadius: 5, padding: 10, flex: 1, marginRight: 5 }} onPress={props.onRequestClose}>
                            <Text style={{ color: '#FFFBE9', fontSize: 20, textAlign: 'center' }}>Dismiss</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#AD8B73', borderRadius: 5, padding: 10, flex: 1, marginLeft: 5 }} onPress={() => props.onSubmit(seconds + 60 * (minutes + 60 * hours))}>
                            <Text style={{ color: '#FFFBE9', fontSize: 20, textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
function NumberDigit(props: { value: number, maxValue: number, onStep: (decrement: boolean) => void, onChange: (value: number) => void }) {
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
                value={String(props.value).padStart(2, '0')}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const num = Math.min(Math.max(parseInt(text || '0', 10), 0), props.maxValue);
                    props.onChange(num);
                }}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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