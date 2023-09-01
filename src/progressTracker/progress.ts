import type { ProgressProvider } from '@/progressTracker/types'

export class Progress implements ProgressProvider {
    current: number
    overall: number
    currentInterval: number
    intervalCount: number

    constructor(current: number, overall: number, currentInterval?: number, intervalCount?: number) {
        this.current = current
        this.overall = overall
        this.currentInterval = currentInterval ?? current
        this.intervalCount = intervalCount ?? overall
    }

    /*current(interval?: boolean = false): number {
        return interval ? this.currentInterval : this.currentStep
    }

    overall(interval?: boolean = false): number {
        return interval ? this.intervalCount : this.overallSteps
    }*/
}
