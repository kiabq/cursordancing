export class Attendance {
    amount: number;

    constructor() {
        this.amount = 0;
        this.incrementAttendance = this.incrementAttendance.bind(this);
        this.decrementAttendance = this.decrementAttendance.bind(this);
    }

    public incrementAttendance() {
        this.amount = this.amount + 1;
    }

    public decrementAttendance() {
        if (this.amount > 0) {
            this.amount = this.amount - 1;
        }
    }
}
