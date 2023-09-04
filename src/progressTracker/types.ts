export interface TrackableProgress {
    init: (overall: number) => void
    track: (current: number, overall?: number) => void
    trackNext: () => void
    onTrack: (handler: ProgressHandler, intervalCount?: number) => void
}

export type ProgressHandler = (progress: ProgressProvider) => void

export interface ProgressProvider {
    current: number
    overall: number
    currentInterval: number
    intervalCount: number
}

export type ProgressTrackerConfig = {
    intervalCount?: number
    maxUpdateInterval?: number
}
