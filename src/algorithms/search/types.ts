import type { Simulation, SimulationResult, SimulationStep } from '@/simulation/types'

interface SearchSimulationStep extends SimulationStep {
}

interface SearchSimulationResult extends SimulationResult {
}

export interface SearchSimulation extends Simulation<SearchSimulationStep, SearchSimulationResult> {}
