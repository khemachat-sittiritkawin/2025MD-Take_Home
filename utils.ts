

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