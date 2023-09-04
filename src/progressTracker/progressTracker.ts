import type { ProgressHandler, ProgressTrackerConfig, TrackableProgress } from '@/progressTracker/types'
import { Progress } from '@/progressTracker/progress'

export class ProgressTracker implements TrackableProgress {
    private handler: ProgressHandler = () => {}
    private intervalCount: number | undefined
    private intervalSize: number = 1
    private currentInterval: number = 0
    private maxIntervalSize: number | undefined
    private lastForcedCurrent: number = 0
    private overall: number = 0
    private lastCurrent: number = 0

    constructor(config?: ProgressTrackerConfig) {
        this.intervalCount = config?.intervalCount
        this.maxIntervalSize = config?.maxUpdateInterval
    }

    init(overall: number): void {
        this.overall = overall
        this.currentInterval = 0
        this.lastCurrent = 0
        this.lastForcedCurrent = 0
        if (this.intervalCount !== undefined) {
            this.intervalSize = this.overall / this.intervalCount
        }
    }

    onTrack(handler: ProgressHandler): void {
        this.handler = handler
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
            if (currentInterval > this.currentInterval && this.lastForcedCurrent + this.intervalSize <= current) {
                this.handler(new Progress(current, this.overall, currentInterval, this.intervalCount))
            } else if (current - this.maxIntervalSize >= Math.max(this.currentInterval, this.lastForcedCurrent) || current === this.overall) {
                this.lastForcedCurrent = current
                this.handler(new Progress(current, this.overall, currentInterval, this.intervalCount))
            }
            this.currentInterval = currentInterval
        }
    }

    trackNext() {
        this.track(this.lastCurrent + 1)
    }

}
