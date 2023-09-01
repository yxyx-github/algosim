import type { ProgressHandler, TrackableProgress } from '@/progressTracker/types'

export class ProgressTracker implements TrackableProgress {
    private handler: ProgressHandler
    private overall: number

    init(overall: number): void {
        this.overall = overall
    }

    onTrack(handler: ProgressHandler): void {
        this.handler = handler
    }

    track(current: number, overall: number = this.overall): void {
        this.handler(current, overall)
    }

}
