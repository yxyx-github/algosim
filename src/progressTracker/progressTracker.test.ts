import { describe, expect, test, vi } from 'vitest'
import type { ProgressProvider, TrackableProgress } from '@/progressTracker/types'
import { ProgressTracker } from '@/progressTracker/progressTracker'
import { Progress } from '@/progressTracker/progress'

describe('ProgressTracker', () => {
    const mocks = {
        handle: (p: ProgressProvider) => {}
    }

    test('can track progress with trackNext', () => {
        const overall = 6
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker()
        tracker.onTrack(spyHandler)
        tracker.init(overall)
        for (let i = 1; i <= overall; i++) {
            tracker.trackNext()
            expect(spyHandler).toHaveBeenCalledTimes(i)
            expect(spyHandler).toHaveBeenCalledWith(new Progress(i, 6))
        }
    })
})
