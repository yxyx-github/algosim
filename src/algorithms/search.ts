import type { Simulation, SimulationResult, SimulationStep } from '@/simulation'

interface SearchSimulationStep extends SimulationStep {
}

interface SearchSimulationResult extends SimulationResult {
}

export interface SearchSimulation extends Simulation<SearchSimulationStep, SearchSimulationResult> {}
