import { describe, expect, test, vi } from "vitest";
import type { SortSimulation } from '@/main/algorithms/sort/types'
import { QuickSort } from '@/main/algorithms/sort/quickSort'
import type { ProgressHandler, TrackableProgress } from '@/main/progressTracker/types'
import { SortSimulationStepFactory } from '@/main/algorithms/sort/sortSimulationStepFactory'
import { SortColor } from '@/main/algorithms/sort/sortColor'

describe('QuickSort', () => {
    const mockTracker: TrackableProgress = {
        init: (overall: number) => {},
        track: (current: number, overall?: number) => {},
        trackNext: () => {},
        onTrack: (handler: ProgressHandler, intervalCount?: number) => {},
    }

    test('sort numbers with protocol', () => {
        const input = [3, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 10, 7, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 10, 7, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 7, 10, 2, 4, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 7, 10, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 10, 7, 4, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 10, 7, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 3, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 3, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 3, 4, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 3, 4, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 4, 3, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 4, 3, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }]),

                SortSimulationStepFactory.createSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12])
            ]
        }

        const result = new QuickSort().sort(input)
        expect(result).toEqual(expected)
    })

    test('sort numbers with protocol and track progress', () => {
        const input = [3, 4, 2, 7, 10, 1, 2, 2, 4, 12]
        const expected: SortSimulation = {
            steps: [
                SortSimulationStepFactory.createSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }, { color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 9 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 7, 10, 1, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 5 }, { color: SortColor.THRESHOLD, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 10, 7, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 10, 7, 2, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }, { color: SortColor.THRESHOLD, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 7, 10, 2, 4, 12], [{ color: SortColor.CURRENT, index: 6 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 7, 10, 2, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 7 }, { color: SortColor.THRESHOLD, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 10, 7, 4, 12], [{ color: SortColor.CURRENT, index: 7 }, { color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 10, 7, 4, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 6 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 1 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([3, 4, 2, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 2 }, { color: SortColor.THRESHOLD, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 3, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 4, 3, 1, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }, { color: SortColor.THRESHOLD, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 3, 4, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 3 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 3, 4, 2, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 4 }, { color: SortColor.THRESHOLD, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 4, 3, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 4, 3, 2, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 3 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }, { color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 2 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([2, 1, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 1 }, { color: SortColor.CURRENT, index: 0 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }, { color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 4 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 5 }]),

                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }, { color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 7 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }]),
                SortSimulationStepFactory.createHighlightedSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12], [{ color: SortColor.CURRENT, index: 8 }]),

                SortSimulationStepFactory.createSimulationStep([1, 2, 2, 2, 3, 4, 4, 7, 10, 12])
            ]
        }


        const spyInit = vi.spyOn(mockTracker, 'init')
        const spyTrack = vi.spyOn(mockTracker, 'track')
        const spyTrackNext = vi.spyOn(mockTracker, 'trackNext')

        const result = new QuickSort().sort(input, mockTracker)
        expect(result).toEqual(expected)


        expect(spyInit).toHaveBeenCalledOnce()
        expect(spyInit).toHaveBeenCalledWith(10)
        expect(spyTrack).toHaveBeenCalledTimes(0)
        expect(spyTrackNext).toHaveBeenCalledTimes(10)
    })
})
