import type { EdgeValue, GraphForm, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'

export class GraphFormConverter {
    graphFromForm(form: GraphForm): Graph<VertexValue, EdgeValue> {
        console.log('convert:', form)
        const graph = new Graph<VertexValue, EdgeValue>()
        return graph
    }
}
