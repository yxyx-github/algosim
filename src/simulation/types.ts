export interface Simulation<S extends SimulationStep, R extends SimulationResult> {
    steps: S[]
    result: R
}

export interface SimulationStep {}
export interface SimulationResult {}
