export interface TrackableProgress {
    init: (overall: number) => void
    track: (current: number, overall?: number) => void
    onTrack: (handler: ProgressHandler) => void
}

export type ProgressHandler = (progress: Progress) => void

export type Progress = {
    current: number
    overall: number
}
