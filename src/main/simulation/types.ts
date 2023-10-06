export type StepCloner<S> = (step: S) => S

export interface Simulation<S extends SimulationStep> {
    steps: S[]
}

export interface SimulationStep {}
