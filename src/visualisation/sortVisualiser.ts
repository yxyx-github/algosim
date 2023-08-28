import type {SortSimulation, SortSimulationStep} from "@/algorithms/sort"
import type {Visualisation, Visualiser} from "@/visualisation/visualisation";

export class SortVisualiser implements Visualiser<SortSimulation> {

    private readonly SVG_NS: string = "http://www.w3.org/2000/svg";

    constructor(
        private width: number,
        private height: number,
        private scale: number = 1,
        private columnWidth: number = 5,
        private highlightedColor: string = "#ff0000",
        private neutralColor: string = "#8b8b8b",
    ) {}

    visualise(simulation: SortSimulation): Visualisation {
        let steps: SVGElement[] = new Array<SVGElement>()
        simulation.steps.forEach(step => steps.push(this.visualiseStep(step)))
        return {steps};
    }

    private visualiseStep(step: SortSimulationStep): SVGElement {
        let svg: SVGElement = document.createElementNS(this.SVG_NS, "svg")
        svg.setAttribute("width", String(this.width))
        svg.setAttribute("height", String(this.height))

        step.sortedValues
            .forEach((num: number, index: number) => {
                svg.appendChild(this.visualiseNumber(index, num, step.highlightedIndices.includes(index)))
            })

        return svg;
    }

    private visualiseNumber(index: number, size: number, highlighted: boolean = false): SVGElement {
        let column: SVGElement = document.createElementNS(this.SVG_NS, "rect")

        column.setAttribute("x", String(index * this.columnWidth))
        column.setAttribute("y", String(Math.max(this.height - this.scale * size, 0)))
        column.setAttribute("width", String(this.columnWidth))
        column.setAttribute("height", String(Math.min(this.scale * size, this.height)))
        column.setAttribute("fill", highlighted ? this.highlightedColor : this.neutralColor)

        return column
    }
}
