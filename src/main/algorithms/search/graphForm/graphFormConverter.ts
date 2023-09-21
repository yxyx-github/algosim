import type { EdgeValue, TRBL, VertexValue } from '@/main/algorithms/search/graphForm/types'
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
        const edgeItemFragments: EdgeItemFragment[] = []

        this.graphForm.toItems()
            .filter(item => item.hasConnections())
            .forEach(item => {
                console.log(item.data())

                this.graphForm.validateConnections(item)

                if (item.data().type === GraphFormItemType.VERTEX) {
                    // TODO: check item has vertex neighbours -> insert edge
                    this.addItemAsVertex(item)
                } else {
                    edgeItems.push(item)
                }
            })

        let remainingEdgeItems = edgeItems

        while (remainingEdgeItems.length > 0) {
            const currentItem = remainingEdgeItems[0]
            const currentFragment: EdgeItemFragment = this.generateEdgeItemFragment(currentItem)
            edgeItemFragments.push(currentFragment) // TODO: check if fragment has any vertices

            remainingEdgeItems = remainingEdgeItems.filter((item: GraphFormItem) => !currentFragment.edgeItems.includes(item))
        }

        return this.graph
    }

    // TODO: move to EdgeFragmentGenerator class and test
    // TODO: create Fragment class
    private generateEdgeItemFragment(item: GraphFormItem): EdgeItemFragment {
        const currentFragment: EdgeItemFragment = { vertexItems: [], edgeItems: [item] }
        const neighbours: TRBL<GraphFormItem | undefined> = this.graphForm.getConnectedNeighbours(item);
        (Object.values(neighbours)
            .filter(neighbour => neighbour !== undefined) as GraphFormItem[])
            .filter(neighbour => {
                if (neighbour.data().type === GraphFormItemType.VERTEX) {
                    currentFragment.vertexItems.push(neighbour)
                    return false
                } else {
                    return true
                }
            })
            .forEach((neighbour: GraphFormItem) => {
                currentFragment.edgeItems.push(neighbour)
                const subFragment = this.generateEdgeItemFragment(neighbour) // TODO: fix infinite loop in case of edgeItemCircle without vertices
                subFragment.edgeItems.forEach((subEdgeNeighbour: GraphFormItem) => {
                    if (!currentFragment.edgeItems.includes(subEdgeNeighbour)) {
                        currentFragment.edgeItems.push(subEdgeNeighbour)
                    }
                })
                subFragment.vertexItems.forEach((subVertexNeighbour: GraphFormItem) => currentFragment.vertexItems.push(subVertexNeighbour))
            })
        return currentFragment
    }

    private addItemAsVertex(item: GraphFormItem) {
        this.graph.addVertex(new Vertex<VertexValue>(item.generateItemId(), {
            item: item
        }))
    }
}
