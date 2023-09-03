import type { ProgressHandler, TrackableProgress } from '@/progressTracker/types'
import { Progress } from '@/progressTracker/progress'

export class ProgressTracker implements TrackableProgress {
    private handler: ProgressHandler = () => {}
    private intervalCount: number | undefined
    private currentInterval: number = 0
    private overall: number = 0
    private lastCurrent: number = 0

    constructor(overall?: number) {
        if (overall) this.init(overall)
    }

    init(overall: number): void {
        this.overall = overall
        this.currentInterval = 0
    }

    onTrack(handler: ProgressHandler, intervalCount?: number): void {
        this.handler = handler
        this.intervalCount = intervalCount
    }

    track(current: number, overall?: number): void {
        if (overall) {
            this.overall = overall
        }
        this.lastCurrent = current
        if (this.intervalCount === undefined) {
            this.handler(new Progress(current, this.overall))
        } else {
            const currentInterval = Math.floor(this.intervalCount / this.overall * current)
            if (currentInterval > this.currentInterval) {
                this.currentInterval = currentInterval
                this.currentInterval = currentInterval
                this.handler(new Progress(current, this.overall, currentInterval, this.intervalCount))
            }
        }
    }

    trackNext() {
        this.track(this.lastCurrent + 1)
    }

}
