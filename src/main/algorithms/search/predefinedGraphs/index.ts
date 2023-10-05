import type { RawGraphForm } from '@/main/algorithms/search/algorithms/dataHelpers/types'
import * as raw_3x1_0 from './data/3x1_0.json'
import * as raw_3x4_0 from './data/3x4_0.json'
import type { GraphForm } from '@/main/algorithms/search/graphForm/graphForm'
import { importRawGraphForm } from '@/main/algorithms/search/algorithms/dataHelpers'

export const rawGraphFormInputs: RawGraphForm[] = [
    raw_3x1_0,
    raw_3x4_0,
]
