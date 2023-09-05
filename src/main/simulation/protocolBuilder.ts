import type { Simulation, SimulationStep } from '@/main/simulation/types'

export class ProtocolBuilder<S extends SimulationStep> {
    private steps: S[] = []

    step(step: S): void {
        this.steps.push(structuredClone(step))
    }

    build(): Simulation<S> {
        return { steps: this.steps }
    }
}
