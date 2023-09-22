import type { EdgeValue, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { VisitedItems } from '@/main/algorithms/search/graphForm/graphFormConverter/visitedItems'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { Edge } from '@/main/algorithms/search/graph/edge'

export class GraphFormConverter {
    private readonly graph: Graph<VertexValue, EdgeValue>
    private readonly graphForm: GraphForm
    private readonly visitedItems: VisitedItems

    constructor(graphForm: GraphForm) {
        this.graph = new Graph()
        this.graphForm = graphForm
        this.visitedItems = new VisitedItems(this.graphForm)
    }

    toGraph(): Graph<VertexValue, EdgeValue> {
        // console.log('convert:', this.graphForm)

        /*
            - while graphForm has unvisited items:      // to properly parse non-contiguous graphs
                - depth search
                    - store edges until next vertex
                        -> create edge and cleare stored items
        */

        this.graphForm.validateConnections()

        let currentItem: GraphFormItem

        while (this.visitedItems.hasUnvisited()) {
            const itemCollection: GraphFormItem[] = [] // TODO: extract to new class EdgeItemCollection
            currentItem = this.visitedItems.nextUnvisited() as GraphFormItem
            this.itemDepthSearch(currentItem, itemCollection)
        }

        // console.log(this.graph)

        return this.graph
    }

    private itemDepthSearch(currentItem: GraphFormItem, itemCollection: GraphFormItem[]) {
        this.visitedItems.setVisited(currentItem)
        const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(currentItem)
        // console.log('nbs:', neighbours)
        // console.log(Object.entries(neighbours))
        for (const [side, neighbour] of Object.entries(neighbours)) {
            // console.log('side:', neighbour)
            if (neighbour !== undefined) {
                if (!this.visitedItems.isVisited(neighbour)) {
                    this.itemDepthSearch(neighbour, itemCollection)
                    itemCollection.push(neighbour)
                } else if (neighbour.data().type === GraphFormItemType.VERTEX) {
                    itemCollection.push(neighbour)
                }
            }
        }
        if (currentItem.data().type === GraphFormItemType.VERTEX && itemCollection.length > 0) {
            this.insertItemCollection(currentItem, itemCollection)
        }
    }

    private insertItemCollection(currentItem: GraphFormItem, itemCollection: GraphFormItem[]) {
        if (itemCollection[0].data().type === GraphFormItemType.VERTEX) {
            const v1: Vertex<VertexValue> = this.addItemAsVertex(currentItem)
            const v2: Vertex<VertexValue> = this.addItemAsVertex(itemCollection[0])
            const edgeItems = itemCollection.splice(0, 1)
            this.graph.addEdgeBetween(v1, v2, itemCollection.length - 1, {
                items: edgeItems,
            })
        } else {
            console.error('Unexpected end of edge')
        }
        itemCollection.splice(0)
    }

    private addItemAsVertex(item: GraphFormItem): Vertex<VertexValue> {
        const id: string = item.generateItemId()
        const vertex: Vertex<VertexValue> = this.graph.findVertexById(id) ?? new Vertex<VertexValue>(id, {
            item: item
        })
        return vertex
    }
}
