import type { RawGraphForm } from '@/main/algorithms/search/algorithms/dataHelpers/types'
import * as raw_3x1_0 from './data/3x1_0.json'
import * as raw_5x1_0 from './data/5x1_0.json'
import * as raw_3x4_0 from './data/3x4_0.json'
import * as raw_5x5_0 from './data/5x5_0.json'
import * as raw_5x6_0 from './data/5x6_0.json'
import * as raw_4x4_0 from './data/4x4_0.json'
import * as raw_8x8_0 from './data/8x8_0.json'
import * as raw_10x10_0 from './data/10x10_0.json'
import * as raw_6x6_0 from './data/6x6_0.json'
import * as raw_5x5_1 from './data/5x5_1.json'
import * as raw_5x5_2 from './data/5x5_2.json'
import * as raw_11x9_0 from './data/11x9_0.json'

export const rawGraphFormInputs: RawGraphForm[] = [
    raw_3x4_0,
    raw_5x5_0,
    raw_5x6_0,
    raw_4x4_0,
    raw_8x8_0,
    raw_10x10_0,
    raw_6x6_0,
    raw_5x5_1,
    raw_11x9_0,
    ...(import.meta.env.VITE_INCLUDE_DEBUG_PREDEFINED_GRAPH_SELECTION === 'true' ? [
        raw_3x1_0,
        raw_5x1_0,
        raw_5x5_2,
    ] : []),
]
