import type { Simulation, SimulationStep } from '@/simulation/types'

interface SearchSimulationStep extends SimulationStep {
}

export interface SearchSimulation extends Simulation<SearchSimulationStep> {}
