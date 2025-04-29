import { View, Text, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChallengeData, deleteChallenge, loadChallenges, saveChallenges, TaskData } from "../utils";
import { ChallengeItem } from "../components/ChallengeItem";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


const mockChallenges = [
    new ChallengeData("Super RPG Quest 3D", [
        new TaskData("Collect all coins in Level 1", 10),
        new TaskData("Defeat the first boss", 45),
        new TaskData("Complete the underwater level", 25),
        new TaskData("Find the hidden treasure in Level 3", 1 * 60 + 12),
        new TaskData("Rescue the cat from the tree", 20),
        new TaskData("Kill God", 10),
    ]),
    new ChallengeData("Space Adventure", [
        new TaskData("Repair the spaceship", 15),
        new TaskData("Collect 50 space crystals", 30),
        new TaskData("Defeat the alien overlord", 50),
        new TaskData("Navigate through the asteroid field", 20),
        new TaskData("Rescue the stranded astronaut", 25),
    ]),
    new ChallengeData("Mystery Mansion", [
        new TaskData("Find the hidden key", 10),
        new TaskData("Solve the riddle in the library", 20),
        new TaskData("Escape the haunted basement", 35),
        new TaskData("Uncover the secret passage", 15),
        new TaskData("Defeat the ghost in the attic", 40),
    ]),
    new ChallengeData("Jungle Expedition", [
        new TaskData("Cross the rope bridge", 10),
        new TaskData("Find the ancient artifact", 25),
        new TaskData("Escape the wild animals", 20),
        new TaskData("Navigate through the dense forest", 30),
        new TaskData("Climb the tallest tree", 15),
    ]),
];

async function tryAddDefaultChallenges() {
    const HAVE_DEFAULT_CHALLENGES = "HAVE_DEFAULT_CHALLENGES";
    let initted = await AsyncStorage.getItem(HAVE_DEFAULT_CHALLENGES);
    let challenges = await loadChallenges();
    if (!initted && challenges.size == 0) {
        for (const c of mockChallenges) {
            challenges.set(uuidv4(), c);
        }
    }
    await saveChallenges(challenges);
    await AsyncStorage.setItem(HAVE_DEFAULT_CHALLENGES, JSON.stringify(true));
}

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {

    const [items, setItems] = useState<Map<string, ChallengeData> | undefined>(undefined);

    function refreshItems() {
        loadChallenges()
            .then((loadedItems) => {
                setItems((prev) => loadedItems);
            });
    }

    useEffect(() => {
        tryAddDefaultChallenges().then(() => refreshItems());
    }, []);

    useEffect(() => {
        if (!items) {
            tryAddDefaultChallenges().then(() => refreshItems());
        } else {
            saveChallenges(items).catch((e) => console.log(e));
        }
    }, [items]);

    useFocusEffect(
        React.useCallback(() => {
            refreshItems();
        }, [])
    );

    function ContentView() {
        if (items === undefined) {
            return (
                <View style={styles.centerTextContainer}>
                    <Text style={styles.centerText}>Loading</Text>
                </View>
            );
        }

        if (items.size === 0) {
            return (
                <View style={styles.centerTextContainer}>
                    <Text style={styles.centerText}>No challenges available. Start by adding a new challenge!</Text>
                </View>
            );
        }

        return <FlatList
            data={Array.from(items.entries())}
            renderItem={({ item }) => <ChallengeItem data={item[1]}
                onPress={() => navigation.navigate("Challenge", { challenge: item[1] })}
                onEditButtonPressed={() => {
                    navigation.navigate("Editor", { data: item[1], saveID: item[0] });
                }}
                onDeleteButtonPressed={() => {
                    deleteChallenge(item[0])
                        .then(() => refreshItems())
                        .catch((reason) => console.log(reason));
                }}
            />}
            keyExtractor={(item, idx) => item[1].title + idx}
        />;
    }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE9' }}>
        <StatusBar backgroundColor="#E3CAA5" barStyle="dark-content" />
        <View style={{ backgroundColor: '#AD8B73', padding: 8, flexDirection: 'row', paddingHorizontal: 13 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFBE9' }}>Challenges</Text>
        </View>

        <View style={{ margin: 10, flex: 1 }}>
            <ContentView />
        </View>

        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate("Editor", { data: new ChallengeData("No Name", []), saveID: uuidv4() })}
            >
                <Text style={{ fontSize: 30, color: '#FFFBE9' }}>+</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    createButton: {
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
    button: { backgroundColor: '#E3CAA5', padding: 10, borderRadius: 5, marginBottom: 10 },
    text: { fontSize: 25, fontWeight: 'bold', color: '#5C4033' }, // Darker brown for better contrast
    centerText: { fontSize: 15, textAlign: 'center' },
    centerTextContainer: { justifyContent: 'center', alignContent: 'center', flex: 1 },
    infoText: { color: '#5C4033', fontSize: 16, marginRight: 5 },
});