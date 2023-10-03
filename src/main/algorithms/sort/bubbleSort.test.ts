import { describe, expect, test, vi } from 'vitest'
import type { SortSimulation } from '@/main/algorithms/sort/types'
import { BubbleSort } from '@/main/algorithms/sort/bubbleSort'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { SortColor } from '@/main/algorithms/sort/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'

describe('BubbleSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.create([3, 4, 2, 7]),
                SortSimulationStepFactory.create([3, 4, 2, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 4, 2, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7]),
            ],
        }

        const result = new BubbleSort().run(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.create([3, 4, 2, 7]),
                SortSimulationStepFactory.create([3, 4, 2, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 4, 2, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.create([3, 2, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.create([2, 3, 4, 7]),
            ],
        }

        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new BubbleSort().run(input, mockTracker)
        expect(result).to.deep.equal(expected)

        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(6)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(6)
    })
})
