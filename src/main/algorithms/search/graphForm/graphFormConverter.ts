import type { EdgeValue, GraphForm, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { graphFormToItems } from '@/main/algorithms/search/graphForm/index'

export class GraphFormConverter {
    graphFromForm(form: GraphForm): Graph<VertexValue, EdgeValue> {
        console.log('convert:', form)
        const graph = new Graph<VertexValue, EdgeValue>()

        graphFormToItems(form)
            .filter(item => Object.values(item.connections).some(v => v))
            .forEach(item => {
                console.log(item)
            })

        return graph
    }
}
