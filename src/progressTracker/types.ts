export interface TrackableProgress {
    init: (overall: number) => void
    track: (current: number, overall?: number) => void
    onTrack: (handler: ProgressHandler) => void
}

export type ProgressHandler = (current: number, overall: number) => void
