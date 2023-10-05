import type { RawGraphForm, RawGraphFormGrid, RawSearchSimulation } from '@/main/algorithms/search/algorithms/dataHelpers/types'
import type { SearchSimulation } from '@/main/algorithms/search/algorithms/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

export function importRawGraphForm(data: RawGraphForm): GraphForm {
    const graphForm = new GraphForm(generateGraphFormGrid(data.grid))
    graphForm.setStartItem(graphForm.toItems().find(item =>
        item.generateItemId() === new GraphFormItem(data.startItem.itemData).generateItemId()
    ) ?? null)
    graphForm.setEndItem(graphForm.toItems().find(item =>
        item.generateItemId() === new GraphFormItem(data.endItem.itemData).generateItemId()
    ) ?? null)

    return graphForm
}

// TODO: test
export function importRawSearchSimulation(data: RawSearchSimulation): SearchSimulation {
    return {
        steps: data.steps.map(step => {
            const grid = generateGraphFormGrid(step.grid)
            const gf = new GraphForm(grid)
            return {
                grid: grid,
                start: gf.toItems().find(item =>
                    item.generateItemId() === new GraphFormItem(step.start.itemData).generateItemId()
                ),
                end: gf.toItems().find(item =>
                    item.generateItemId() === new GraphFormItem(step.end.itemData).generateItemId()
                ),
            }
        })
    }
}

function generateGraphFormGrid(rawGrid: RawGraphFormGrid) {
    return rawGrid.map(row =>
        row.map(item =>
            new GraphFormItem(item.itemData)
        )
    )
}
