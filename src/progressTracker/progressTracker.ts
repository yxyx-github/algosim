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

    track(current: number, overall: number = this.overall): void {
        this.lastCurrent = current
        if (this.intervalCount !== undefined) {
            const currentInterval = Math.floor(this.intervalCount / overall * current)
            if (currentInterval > this.currentInterval) {
                this.currentInterval = currentInterval
                this.currentInterval = currentInterval
                this.handler(new Progress(current, overall, currentInterval, this.intervalCount))
            }
        } else {
            this.handler(new Progress(current, overall))
        }
    }

    trackNext() {
        this.track(this.lastCurrent + 1)
    }

}
