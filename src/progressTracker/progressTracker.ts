import type { ProgressHandler, TrackableProgress } from '@/progressTracker/types'
import { Progress } from '@/progressTracker/progress'

export class ProgressTracker implements TrackableProgress {
    private handler: ProgressHandler
    private intervalCount: number | undefined
    private overall: number
    private currentInterval: number = 0

    init(overall: number): void {
        this.overall = overall
        this.currentInterval = 0
    }

    onTrack(handler: ProgressHandler, intervalCount?: number): void {
        this.handler = handler
        this.intervalCount = intervalCount
    }

    track(current: number, overall: number = this.overall): void {
        const currentInterval = Math.floor(this.intervalCount / overall * current)
        if (currentInterval > this.currentInterval) {
            this.currentInterval = currentInterval
            this.currentInterval = currentInterval
            this.handler(new Progress(current, overall, currentInterval, this.intervalCount))
        }
    }

}
