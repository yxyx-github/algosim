import type { EdgeValue, Side, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
import { GraphFormItemType } from '@/main/algorithms/search/graphForm/types'
import { Graph } from '@/main/algorithms/search/graph/graph'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { Vertex } from '@/main/algorithms/search/graph/vertex'
import type { EdgeItemFragment } from '@/main/algorithms/search/graphForm/graphFormConverter/types'

export class GraphFormConverter {
    private readonly graph: Graph<VertexValue, EdgeValue>
    private readonly graphForm: GraphForm

    constructor(graphForm: GraphForm) {
        this.graph = new Graph()
        this.graphForm = graphForm
    }

    toGraph(): Graph<VertexValue, EdgeValue> {
        console.log('convert:', this.graphForm)

        /*
            - convert to Graph:
              -> separate vertices and edges
              -> for each edge:
                -> check connections to neighbours and their neighbours (collect edges in fragment)
                -> remove edge from list
        */

        const edgeItems: GraphFormItem[] = []

        this.graphForm.toItems()
            .filter(item => item.hasConnections())
            .forEach(item => {
                console.log(item.data())

                this.validateConnections(item)

                if (item.data().type === GraphFormItemType.VERTEX) {
                    // TODO: check item has vertex neighbours -> insert edge
                    this.addItemAsVertex(item)
                } else {
                    edgeItems.push(item)
                }
            })

        const edgeItemFragments: EdgeItemFragment[] = []
        let remainingEdgeItems = edgeItems

        while (remainingEdgeItems.length > 0) {
            const currentItem = remainingEdgeItems[0]
            const currentFragment: EdgeItemFragment = this.generateEdgeItemFragment(currentItem)
            edgeItemFragments.push(currentFragment) // TODO: check if fragment has any vertices

            remainingEdgeItems = remainingEdgeItems.filter((item: GraphFormItem) => !currentFragment.edgeItems.includes(item))
        }

        return this.graph
    }

    private generateEdgeItemFragment(item: GraphFormItem): EdgeItemFragment {
        const currentFragment: EdgeItemFragment = { vertexItems: [], edgeItems: [item] }
        const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(item);
        (Object.values(neighbours)
            .filter(neighbour => neighbour !== undefined) as GraphFormItem[])
            // TODO: filter vertices => save vertices
            .forEach((neighbour: GraphFormItem) => {
                currentFragment.edgeItems.push(neighbour)
                const subFragment = this.generateEdgeItemFragment(neighbour)
                subFragment.edgeItems.forEach((subNeighbour: GraphFormItem) => {
                    if (!currentFragment.edgeItems.includes(subNeighbour)) {
                        currentFragment.edgeItems.push(subNeighbour)
                    }
                })
                // TODO copy vertices from subFragment to currentFragment
            })
        return currentFragment
    }

    // TODO: move to GraphForm as public method and test
    private validateConnections(item: GraphFormItem) {
        const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(item)
        const newConnections: TRBL<boolean> = item.data().connections;
        (Object.keys(newConnections) as Side[])
            .filter((side: Side) => newConnections[side])
            .forEach((side: Side) =>
                // TODO: use toggleConnection() instead
                newConnections[side] = neighbours[side]?.data().connections[this.graphForm.oppsiteSide(side)] ?? false
            )

        if (item.data().connections !== newConnections) {
            this.graphForm.updateItem(new GraphFormItem({ ...item.data(), connections: newConnections }))
        }
    }

    private addItemAsVertex(item: GraphFormItem) {
        this.graph.addVertex(new Vertex<VertexValue>(this.generateItemId(item), {
            item: item
        }))
    }

    // TODO: move to GraphFormItem as public method and test
    private generateItemId(item: GraphFormItem): string {
        return `x:${item.data().coords.x}y:${item.data().coords.y}`
    }
}
