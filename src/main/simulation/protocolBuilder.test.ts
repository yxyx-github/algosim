import { describe, expect, expectTypeOf, test } from 'vitest'
import type { Simulation } from '@/main/simulation/types'
import { ProtocolBuilder } from '@/main/simulation/protocolBuilder'

describe('protocolBuilder', () => {
    test('can be created with steps', () => {
        const expected: Simulation<string> = {
            steps: ['step a', 'step b'],
        }
        const pB: ProtocolBuilder<string> = new ProtocolBuilder()

        expectTypeOf(pB.step('step a')).toBeVoid()
        expectTypeOf(pB.step('step b')).toBeVoid()
        expect(pB.build()).toEqual(expected)
    })

    test('steps should be passed as deep copy', () => {
        const expected: Simulation<{ val: string }> = {
            steps: [{ val: 'step a' }, { val: 'step b' }],
        }
        const pB: ProtocolBuilder<{ val: string }> = new ProtocolBuilder()

        let stepValue: { val: string } = { val: '' }
        stepValue.val = 'step a'
        pB.step(stepValue)
        stepValue.val = 'step b'
        pB.step(stepValue)

        expect(pB.build()).toEqual(expected)
    })
})
