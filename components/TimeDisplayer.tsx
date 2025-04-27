import { StyleSheet, Text, View } from 'react-native';

interface TimeDisplayerProps {
    seconds: number,
}

export function TimeDisplayer(props: TimeDisplayerProps) {
    const displayTime = Math.abs(props.seconds);
    const seconds = displayTime % 60;
    const minutes = Math.floor(displayTime / 60);
    const hours = Math.floor(minutes / 60);

    let timeColor = props.seconds < 0 ? 'red' : undefined;

    let styles = StyleSheet.create({
        unitSeparator: {
            fontSize: 20,
            marginHorizontal: 2,
            fontWeight: 'bold',
            color: timeColor,
        },
        timeDial: { fontSize: 20, backgroundColor: '#FFFBE9', padding: 2, borderRadius: 5, color: timeColor },
        timeSign: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 2, color: timeColor }
    });

    return (
        <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
            {props.seconds < 0 
                ? <Text style={styles.timeSign}>-</Text>
                : <></>
            }
            {hours > 0
                ? <><Text style={styles.timeDial}>{String(hours).padStart(2, '0')}</Text>
                    <Text style={styles.unitSeparator}>:</Text></>
                : <></>
            }
            <Text style={styles.timeDial}>{String(minutes % 60).padStart(2, '0')}</Text>
            <Text style={styles.unitSeparator}>:</Text>
            <Text style={styles.timeDial}>{String(seconds).padStart(2, '0')}</Text>
        </View>
    )
}