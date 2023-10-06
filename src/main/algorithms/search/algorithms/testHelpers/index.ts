import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormConverter } from '@/main/algorithms/search/graphForm/graphFormConverter'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

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
