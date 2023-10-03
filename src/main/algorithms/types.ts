import type { Simulation, SimulationStep } from '@/main/simulation/types'

export interface AlgorithmImplementation<T extends SimulationStep> {
    run: (...args: any) => Simulation<T>,
    description: () => string[],
}
