import { StyleSheet, Text, View } from 'react-native';
import { TimeDisplayer } from './TimeDisplayer';

interface TaskItemProps {
    title: string;
    selected: boolean;
    timeLeft: number;
}

export function TaskItem(props: TaskItemProps) {

    return (<View style={{
        flexDirection: 'row', backgroundColor: '#E3CAA5', borderRadius: 5, alignItems: 'center', padding: 8, paddingHorizontal: props.selected ? 9 : 12, marginVertical: 5,
        borderColor: '#AD8B73', borderWidth: props.selected ? 3 : undefined
    }}>
        <Text style={{ fontSize: 16, flexShrink: 1 }}>{props.title}</Text>
        <TimeDisplayer seconds={props.timeLeft}/>
    </View>);
}

