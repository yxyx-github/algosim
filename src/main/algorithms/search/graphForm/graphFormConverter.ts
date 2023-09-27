import type { EdgeValue, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { VisitedItems } from '@/main/algorithms/search/graphForm/graphFormConverter/visitedItems'
import { Vertex } from '@/main/algorithms/search/graph/vertex'

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
        // console.log('convert:', this.graphForm.toGrid().map(row => row.map(item => item.data().connections)))

        this.graphForm.validateConnections()

        let currentItem: GraphFormItem

        while (this.visitedItems.hasUnvisitedVertexItems()) {
            const itemCollection: GraphFormItem[] = [] // TODO: extract to new class EdgeItemCollection
            currentItem = this.visitedItems.nextUnvisitedVertexItem() as GraphFormItem
            this.itemDepthSearch(currentItem, itemCollection)
        }

        // console.log(this.graph)

        return this.graph
    }

    private itemDepthSearch(currentItem: GraphFormItem, itemCollection: GraphFormItem[], previousItem?: GraphFormItem) {
        this.visitedItems.setVisited(currentItem)
        const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(currentItem)
        if (Object.values(neighbours).some(n => n !== undefined)) {
            // console.log('currItem:', `${currentItem.generateItemId()}`)
            // console.log('currItem:', currentItem)
            // console.log('nbs:', neighbours)
            // console.log('----------')
        }
        for (
            const [side, neighbour] of
            Object.entries(neighbours)
                .sort((a, b) => this.compareNeighbourEntries(a, b))
        ) {
            // console.log('side:', neighbour)
            if (neighbour !== undefined && neighbour !== previousItem) {
                if (!this.visitedItems.isVisited(neighbour)) {
                    this.itemDepthSearch(neighbour, itemCollection, currentItem)
                    itemCollection.push(neighbour)
                } else if (neighbour.data().type === GraphFormItemType.VERTEX) {
                    itemCollection.push(neighbour)
                }
                // console.log('check for insertion')
                if (currentItem.data().type === GraphFormItemType.VERTEX && itemCollection.length > 0) {
                    // console.log('insert')
                    this.insertItemCollection(currentItem, itemCollection)
                }
            }
        }
    }

    private insertItemCollection(currentItem: GraphFormItem, itemCollection: GraphFormItem[]) {
        if (itemCollection[0].data().type === GraphFormItemType.VERTEX) {
            const v1: Vertex<VertexValue> = this.addItemAsVertex(currentItem)
            const v2: Vertex<VertexValue> = this.addItemAsVertex(itemCollection[0])
            const edgeItems = itemCollection.filter((_, index) => index !== 0)
            const weight = edgeItems.length + 1
            const existingEdge = edgeItems.length === 0 ? this.graph.findEdge(e =>
                e.getFrom() === v1 && e.getTo() === v2 && e.getWeight() === weight
            ) : undefined
            if (edgeItems.length !== 0 || existingEdge === undefined) {
                // TODO: include EdgeItems in id: sort items by coordinates -> improve test
                this.graph.addEdgeBetween(`${v1.getId()}==${weight}=>${v2.getId()}`, `${v2.getId()}==${weight}=>${v1.getId()}`, v1, v2, weight, {
                    items: edgeItems,
                })
            }
            // console.log('edgeItems:', JSON.stringify(edgeItems))
        } else {
            console.error('Unexpected end of edge')
        }
        itemCollection.splice(0)
    }

    private addItemAsVertex(item: GraphFormItem): Vertex<VertexValue> {
        const id: string = item.generateItemId()
        const existingVertex = this.graph.findVertexById(id)
        const vertex: Vertex<VertexValue> = existingVertex ?? new Vertex<VertexValue>(id, {
            item: item
        })
        if (existingVertex === undefined) {
            this.graph.addVertex(vertex)
        }
        // console.log('new v:', vertex)
        return vertex
    }

    private compareNeighbourEntries(a: [string, GraphFormItem | undefined], b: [string, GraphFormItem | undefined]): number {
        const aToNumber = a[1] !== undefined && this.visitedItems.isVisited(a[1]) ? 1 : 0
        const bToNumber = b[1] !== undefined && this.visitedItems.isVisited(b[1]) ? 1 : 0
        return aToNumber - bToNumber
    }
}
