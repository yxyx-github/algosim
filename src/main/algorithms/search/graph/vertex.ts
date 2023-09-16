export class Vertex<T> {
    private readonly id: string
    private readonly value: T

    constructor(id: string, value: T) {
        this.id = id
        this.value = value
    }

    getId(): string {
        return this.id
    }

    getValue(): T {
        return this.value
    }
}
