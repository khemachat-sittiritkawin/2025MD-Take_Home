import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";

export function HomeScreen() {
    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE9', justifyContent: 'center', alignContent: 'center' }}>
        <StatusBar backgroundColor="#E3CAA5" barStyle="dark-content"/>
        <View style={{ margin: 20 }}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Browse Challenges</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Browse Challenges</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    button: { backgroundColor: '#E3CAA5', padding: 20, borderRadius: 5, marginBottom: 10 },
    text: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#5C4033' } // Darker brown for better contrast
});