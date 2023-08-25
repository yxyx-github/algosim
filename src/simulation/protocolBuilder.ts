import type { Simulation, SimulationResult, SimulationStep } from '@/simulation/types'

export class ProtocolBuilder<S extends SimulationStep, R extends SimulationResult> {
    private steps: S[] = []

    step(step: S): void {
        this.steps.push(structuredClone(step))
    }

    buildFromResult(result: R): Simulation<S, R> {
        return { steps: this.steps, result: result }
    }
}
