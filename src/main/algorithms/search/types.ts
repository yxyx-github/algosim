import type { Simulation, SimulationStep } from '@/main/simulation/types'

interface SearchSimulationStep extends SimulationStep {
}

export interface SearchSimulation extends Simulation<SearchSimulationStep> {}
