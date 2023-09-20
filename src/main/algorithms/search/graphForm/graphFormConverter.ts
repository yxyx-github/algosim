import type { EdgeValue, Side, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import type { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

export class GraphFormConverter {
    toGraph(graphForm: GraphForm): Graph<VertexValue, EdgeValue> {
        console.log('convert:', graphForm)
        const graph = new Graph<VertexValue, EdgeValue>()

        const edgeItems: GraphFormItem[] = []
        const edgeItemFragments: { v1: Vertex<VertexValue>, v2: Vertex<VertexValue>, items: GraphFormItem[] }[] = []

        graphForm.toItems()
            .filter(item => item.hasConnections())
            .forEach(item => {
                console.log(item.data())
                if (item.data().type === GraphFormItemType.VERTEX) {
                    graph.addVertex(new Vertex<VertexValue>(this.generateItemId(item), {
                        item: item
                    }))
                } else {
                    // TODO: check if neighbours also have connections, otherwise also treat as vertex
                    edgeItems.push(item)
                }
            })

        while (edgeItems.length > 0) {

        }

        return graph
    }

    private generateItemId(item: GraphFormItem): string {
        return `x:${item.data().coords.x}y:${item.data().coords.y}`
    }
}
