import type { IProtocolBuilder, Simulation, SimulationResult, SimulationStep } from '@/simulation/types'

export class ProtocolBuilder<S extends SimulationStep, R extends SimulationResult> implements IProtocolBuilder<S, R> {
    private steps: S[] = []

    step(step: S): void {
        this.steps.push(step)
    }

    result(result: R): Simulation<S, R> {
        return { steps: this.steps, result: result }
    }
}
