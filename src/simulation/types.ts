export interface Simulation<S extends SimulationStep, R extends SimulationResult> {
    steps: S[]
    result: R
}

export interface SimulationStep {}
export interface SimulationResult {}

export interface IProtocolBuilder<S extends SimulationStep, R extends SimulationResult> {
    step: (step: S) => void
    result: (result: R) => Simulation<S, R>
}
