export interface Simulation<S extends SimulationStep> {
    steps: S[]
}

export interface SimulationStep {}
