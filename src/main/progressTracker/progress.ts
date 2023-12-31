import type { ProgressProvider } from '@/main/progressTracker/types'

export class Progress implements ProgressProvider {
    readonly current: number
    readonly overall: number
    readonly currentInterval: number
    readonly intervalCount: number

    constructor(current: number, overall: number, currentInterval?: number, intervalCount?: number) {
        this.current = current
        this.overall = overall
        this.currentInterval = currentInterval ?? current
        this.intervalCount = intervalCount ?? overall
    }
}
