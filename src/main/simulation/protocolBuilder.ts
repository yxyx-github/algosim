import type { Simulation, SimulationStep, StepCloner } from '@/main/simulation/types'

export class ProtocolBuilder<S extends SimulationStep> {
    private steps: S[] = []
    private stepCloner: StepCloner<S> = (step: S) => structuredClone(step)

    setStepCloner(stepCloner: StepCloner<S>) {
        this.stepCloner = stepCloner
    }

    step(step: S): void {
        this.steps.push(this.stepCloner(step))
    }

    build(): Simulation<S> {
        return { steps: this.steps }
    }
}
