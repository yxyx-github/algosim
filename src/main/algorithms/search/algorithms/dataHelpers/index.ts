import type { RawGraphForm, RawGraphFormGrid, RawItem, RawSearchSimulation } from '@/main/algorithms/search/algorithms/dataHelpers/types'
import type { SearchSimulation, SearchSimulationStep } from '@/main/algorithms/search/algorithms/types'
import { GraphFormItem } from '@/main/algorithms/search/graphForm/graphFormItem'
import { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'

export function importRawGraphForm(data: RawGraphForm): GraphForm {
    const graphForm = new GraphForm(generateGraphFormGrid(data.grid))
    if (data.startItem !== null) {
        graphForm.setStartItem(graphForm.toItems().find(item =>
            item.generateItemId() === new GraphFormItem((data.startItem as RawItem).itemData).generateItemId()
        ) ?? null)
    }
    if (data.endItem !== null) {
        graphForm.setEndItem(graphForm.toItems().find(item =>
            item.generateItemId() === new GraphFormItem((data.endItem as RawItem).itemData).generateItemId()
        ) ?? null)
    }

    return graphForm
}

export function importRawSearchSimulation(data: RawSearchSimulation): SearchSimulation {
    return {
        steps: data.steps.map(stepData => {
            const grid = generateGraphFormGrid(stepData.grid)
            const gf = new GraphForm(grid)
            const step: SearchSimulationStep = {
                grid: grid,
            }
            if (stepData.start !== null) {
                step.start = gf.toItems().find(item =>
                    item.generateItemId() === new GraphFormItem((stepData.start as RawItem).itemData).generateItemId()
                )
            }
            if (stepData.end !== null) {
                step.end = gf.toItems().find(item =>
                    item.generateItemId() === new GraphFormItem((stepData.end as RawItem).itemData).generateItemId()
                )
            }
            return step
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
