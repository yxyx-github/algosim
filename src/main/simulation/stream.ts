import type { Simulation, SimulationStep } from '@/main/simulation/types'
import type { TrackableProgress } from '@/main/progressTracker/types'

export function createSimulationStream<S extends Simulation<T>, T extends SimulationStep>(simulation: S): ReadableStream<T> {
    return new ReadableStream<T>({
        start(controller) {
            for (const step of simulation.steps) {
                controller.enqueue(step)
            }
            controller.close()
        }
    })
}

export async function simulationFromStream<S extends Simulation<T>, T extends SimulationStep>(stream: ReadableStream<T>, progressTracker?: TrackableProgress): Promise<S> {
    const reader = stream.getReader()

    const steps: T[] = []

    async function handleStep({ done, value }: { done: boolean, value: T }): Promise<S> {
        if (done) {
            return { steps: steps } as S
        } else {
            steps.push(value)
            progressTracker?.trackNext()
            // @ts-ignore
            return reader.read().then(handleStep)
        }
    }
    // @ts-ignore
    return reader.read().then(handleStep)
}
