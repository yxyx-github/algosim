import type { EdgeValue, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

export class GraphFormConverter {
    toGraph(graphForm: GraphForm): Graph<VertexValue, EdgeValue> {
        console.log('convert:', graphForm)
        const graph = new Graph<VertexValue, EdgeValue>()

        graphForm.toItems()
            .filter(item => Object.values(item.data().connections).some(v => v))
            .forEach(item => {
                console.log(item.data())
            })

        return graph
    }
}
