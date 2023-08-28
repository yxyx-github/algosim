import type { Simulation } from "@/simulation"

export interface Visualiser<T extends Simulation<any, any>> {
    visualise(simulation: T): Visualisation
}

export interface Visualisation {
    readonly steps: SVGElement[]
}


