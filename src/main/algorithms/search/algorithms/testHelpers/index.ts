import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import type { SearchSimulationResultData } from '@/main/algorithms/search/algorithms/testHelpers/types'
import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

export function createSimulationFromResultData(result: SearchSimulationResultData): SearchSimulation {
    return {
        steps: result.steps.map(step => ({
            grid: step.grid.map(row =>
                row.map(item =>
                    new GraphFormItem(item.itemData)
                )
            ),
            start: new GraphFormItem(step.start.itemData),
            end: new GraphFormItem(step.end.itemData),
        }))
    }
}

export function convertGraphForm(graphForm: GraphForm) {
    const converter = new GraphFormConverter(graphForm)
    const graph: Graph<VertexValue, EdgeValue> = converter.toGraph()
    const startVertex: Vertex<VertexValue> = graph.findVertex(v => v.getValue().item === graphForm.getStartItem()) as Vertex<VertexValue>
    const endVertex: Vertex<VertexValue> = graph.findVertex(v => v.getValue().item === graphForm.getEndItem()) as Vertex<VertexValue>

    return {
        graph,
        startVertex,
        endVertex,
    }
}
