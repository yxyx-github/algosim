import type { EdgeValue, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { VisitedItems } from '@/main/algorithms/search/graphForm/graphFormConverter/visitedItems'

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
        console.log('convert:', this.graphForm)

        /*
            - while graphForm has unvisited items:      // to properly parse non-contiguous graphs
                - depth search
                    - store edges until next vertex
                        -> create edge and cleare stored items
        */

        this.graphForm.validateConnections()

        let currentItem: GraphFormItem

        while (this.visitedItems.hasUnvisited()) {
            currentItem = this.visitedItems.nextUnvisited() as GraphFormItem
            const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(currentItem)
            for (const [side, neighbour] of Object.entries(neighbours)) {
                if (neighbour !== undefined && !this.visitedItems.isVisited(neighbour)) {
                    this.visitedItems.setVisited(neighbour)
                    // TODO: log data for inserting vertices and edges
                }
            }
        }

        return this.graph
    }
}
