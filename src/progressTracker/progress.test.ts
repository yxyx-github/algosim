import { describe, expect, test } from 'vitest'
import type { ProgressProvider } from '@/progressTracker/types'
import { Progress } from '@/progressTracker/progress'

describe('Progress', () => {
    test('can create Progress with all values', () => {
        const current = 100
        const overall = 200
        const currentInterval = 50
        const intervalCount = 100

        const progress: ProgressProvider = new Progress(
            current,
            overall,
            currentInterval,
            intervalCount,
        )

        expect(progress.current).to.equal(current)
        expect(progress.overall).to.equal(overall)
        expect(progress.currentInterval).to.equal(currentInterval)
        expect(progress.intervalCount).to.equal(intervalCount)
    })

    test('can create Progress with required values', () => {
        const current = 100
        const overall = 200

        const progress: ProgressProvider = new Progress(
            current,
            overall,
        )

        expect(progress.current).to.equal(current)
        expect(progress.overall).to.equal(overall)
        expect(progress.currentInterval).to.equal(current)
        expect(progress.intervalCount).to.equal(overall)
    })
})
