import AsyncStorage from "@react-native-async-storage/async-storage";

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

export async function saveChallenges(items: ChallengeData[]) {
    await AsyncStorage.setItem("CHALLENGES", JSON.stringify(items));
}

export async function loadChallenges(): Promise<ChallengeData[]> {
    const items = await AsyncStorage.getItem("CHALLENGES");
    return items ? JSON.parse(items) : [];
}