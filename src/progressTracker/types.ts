export interface TrackableProgress {
    init: (overall: number) => void
    track: (current: number, overall?: number) => void
    onTrack: (handler: ProgressHandler, intervalCount?: number) => void
}

export type ProgressHandler = (progress: ProgressProvider) => void

export interface ProgressProvider {
    current: number
    overall: number
    currentInterval: number
    intervalCount: number

    /*current: (interval?: boolean) => number
    overall: (interval?: boolean) => number*/
}
