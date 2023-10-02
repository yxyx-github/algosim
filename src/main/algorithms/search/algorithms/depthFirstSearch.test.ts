import { describe, expect, test, vi } from 'vitest'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'

describe('DepthFirstSearch', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('search graph with protocol', () => {
    })
})
