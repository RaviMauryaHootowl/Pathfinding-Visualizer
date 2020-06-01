export class Queue extends Array {
    enqueue(val) {
        this.push(val);
    }
    dequeue() {
        return this.shift();
    }
    peek() {
        return this[0];
    }
    isEmpty() {
        return this.length === 0;
    }
}
