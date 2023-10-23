import type { Simulation, SimulationStep } from '@/main/simulation/types'

export interface AlgorithmImplementation<T extends SimulationStep> {
    run: (...args: any) => Simulation<T>,
    description: () => string[],
}

export type AlgorithmData<A> = {
    label: string,
    value: A,
}
