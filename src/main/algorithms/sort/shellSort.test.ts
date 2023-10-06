import { describe, expect, test, vi } from "vitest";
import type { SortSimulation } from '@/main/algorithms/sort/types'
import { ShellSort } from '@/main/algorithms/sort/shellSort'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/types'

describe('ShellSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [5, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.create([5, 4, 2, 7, 10, 1, 2, 2, 4, 12]),
                SortSimulationStepFactory.create([5, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([4, 2, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([4, 2, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 1, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 1, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 1, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 1, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 1, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 1, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 1, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 1, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 2, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 2, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 2, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 2, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 2, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 2, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 2, 10, 5, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 2, 10, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 2, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 2, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 2, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 2, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 5, 10, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 5, 10, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12])
            ]
        }

        const result = new ShellSort().run(input)
        expect(result).to.deep.equal(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [5, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.create([5, 4, 2, 7, 10, 1, 2, 2, 4, 12]),
                SortSimulationStepFactory.create([5, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.create( [4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.create([4, 4, 2, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([4, 2, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.create([4, 2, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 10, 1, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 1, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 7, 1, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 1, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 4, 1, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 1, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 4, 1, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 1, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([2, 1, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 0 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 10, 2, 2, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 2, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 7, 2, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 2, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 4, 2, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 2, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 4, 2, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 6 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 10, 2, 5, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 2, 10, 5, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 7, 2, 10, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 2, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 4, 2, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 2, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 4 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 4, 2, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 7 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 10, 5, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 5, 10, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 7, 5, 10, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 8 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.create([1, 2, 2, 2, 4, 4, 5, 7, 10, 12]),
            ]
        }


        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new ShellSort().run(input, mockTracker)
        expect(result).to.deep.equal(expected)


        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(10)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(10)
    })
})
