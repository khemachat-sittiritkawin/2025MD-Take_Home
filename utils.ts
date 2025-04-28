import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";


export class TaskData {
    title: string;
    timeLeft: number;

    constructor(title: string, timeLeft: number) {
        this.title = title;
        this.timeLeft = timeLeft;
    }

    decrementTime() {
        this.timeLeft -= 1;
    }
}


export class ChallengeData {
    title: string;
    tasks: TaskData[];

    constructor(title: string, tasks: TaskData[]) {
        this.tasks = tasks;
        this.title = title;
    }

    calculateTotalTime() {
        let res = 0;
        for (const task of this.tasks) {
            res += task.timeLeft;
        }
        return res;
    }

    calculateAverageTime() {
        if (this.tasks.length == 0) {
            return 0;
        }
        return this.calculateTotalTime() / this.tasks.length;
    }

    getTasks() {
        let res = [];
        for (const t of this.tasks) {
            res.push(new TaskData(t.title, t.timeLeft))
        }
        return res;
    }
}

export async function saveChallenges(items: Map<string, ChallengeData>) {
    await AsyncStorage.setItem("CHALLENGES", JSON.stringify(items));
}

export async function loadChallenges(): Promise<Map<string, ChallengeData>> {
    const items = await AsyncStorage.getItem("CHALLENGES");
    if (!items) {
        return new Map();
    }
    const parsed = JSON.parse(items);
    return new Map(Object.entries(parsed));
}

export async function loadChallenge(id: string): Promise<ChallengeData | undefined> {
    const items = await loadChallenges();
    return items.get(id);
}

export async function saveChallenge(data: ChallengeData, id?: string) {
    let items = await loadChallenges();
    items.set(id ?? uuidv4(), data);
    await saveChallenges(items);
}

export async function deleteChallenge(id: string) {
    let items = await loadChallenges();
    items.delete(id);
    await saveChallenges(items);
}