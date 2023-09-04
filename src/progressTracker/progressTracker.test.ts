import { describe, expect, test, vi } from 'vitest'
import type { ProgressHandler, ProgressProvider, TrackableProgress } from '@/progressTracker/types'
import { ProgressTracker } from '@/progressTracker/progressTracker'
import { Progress } from '@/progressTracker/progress'
import * as console from 'console'

describe('ProgressTracker', () => {
    const mocks: { handle: ProgressHandler } = {
        handle: (p: ProgressProvider) => {}
    }

    test('can track progress with trackNext', () => {
        const overall = 6
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker()
        // @ts-ignore
        tracker.onTrack(spyHandler)
        tracker.init(overall)
        for (let i = 1; i <= overall; i++) {
            tracker.trackNext()
            expect(spyHandler).toHaveBeenCalledTimes(i)
            expect(spyHandler).toHaveBeenCalledWith(new Progress(i, overall))
        }
    })

    test('can track progress with track', () => {
        const overall = 6
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker()
        // @ts-ignore
        tracker.onTrack(spyHandler)
        tracker.init(overall)
        for (let i = 1; i <= overall; i++) {
            tracker.track(i)
            expect(spyHandler).toHaveBeenCalledTimes(i)
            expect(spyHandler).toHaveBeenCalledWith(new Progress(i, overall))
        }
    })

    test('can track progress with overall change during runtime', () => {
        const initialOverall = 6
        const newOverall = 8
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker()
        // @ts-ignore
        tracker.onTrack(spyHandler)
        tracker.init(initialOverall)
        tracker.track(1)
        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(1, initialOverall))
        tracker.track(2, newOverall)
        expect(spyHandler).toHaveBeenCalledTimes(2)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(2, newOverall))
        for (let i = 3; i <= newOverall; i++) {
            tracker.track(i)
            expect(spyHandler).toHaveBeenCalledTimes(i)
            expect(spyHandler).toHaveBeenCalledWith(new Progress(i, newOverall))
        }
    })

    test('can track progress with custom intervalCount', () => {
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker({ intervalCount: 3 })
        // @ts-ignore
        tracker.onTrack(spyHandler)
        tracker.init(6)

        tracker.track(1)
        tracker.track(2)
        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(2, 6, 1, 3))
        tracker.track(3)
        tracker.track(4)
        expect(spyHandler).toHaveBeenCalledTimes(2)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(4, 6, 2, 3))
        tracker.track(5)
        tracker.track(6)
        expect(spyHandler).toHaveBeenCalledTimes(3)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(6, 6, 3, 3))
    })

    test('can track progress with custom intervalCount and maxIntervalSize', () => {
        const spyHandler = vi.spyOn(mocks, 'handle')
        const tracker: TrackableProgress = new ProgressTracker({ intervalCount: 2, maxUpdateInterval: 3 })
        // @ts-ignore
        tracker.onTrack(spyHandler)
        tracker.init(8)

        tracker.track(1)
        tracker.track(2)
        tracker.track(3)
        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(3, 8, 0, 2))
        tracker.track(4)
        tracker.track(5)
        tracker.track(6)
        expect(spyHandler).toHaveBeenCalledTimes(2)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(6, 8, 1, 2))
        tracker.track(7)
        tracker.track(8)
        expect(spyHandler).toHaveBeenCalledTimes(3)
        expect(spyHandler).toHaveBeenCalledWith(new Progress(8, 8, 2, 2))
    })
})
