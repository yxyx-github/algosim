export class PriorityQueue<T> {

    private readonly data: T[]
    private readonly smallerThen: (a: T, b: T) => boolean

    constructor(startingElements: T[], smallerThen: (a: T, b: T) => boolean) {
        this.data = Array<T>(...startingElements)
        this.smallerThen = smallerThen
    }

    public offer(element: T) {
        this.data.push(element)
    }

    public poll() {
        if (this.isEmpty()) {
            return null
        }
        let min: number = 0
        this.data.forEach((val, i) => {
            if (this.smallerThen(val, this.data[min])) {
                min = i
            }
        })
        let res = this.data[min]
        this.data.splice(min, 1)
        return res
    }

    public isEmpty(): boolean {
        return this.size() == 0
    }

    public size(): number {
        return this.data.length
    }
}
