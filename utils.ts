

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
}