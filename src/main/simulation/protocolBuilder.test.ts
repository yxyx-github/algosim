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
        expect(pB.build()).to.deep.equal(expected)
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

        expect(pB.build()).to.deep.equal(expected)
    })

    test('steps should be passed as deep copy but should keep class type', () => {
        type MyStep = { val: MyValue }

        class MyValue {
            private readonly value: string = ''

            constructor(value: string) {
                this.value = value
            }

            getValue() {
                return this.value
            }
        }

        const expected: Simulation<MyStep> = {
            steps: [{ val: new MyValue('step a') }, { val: new MyValue('step b') }],
        }
        const pB: ProtocolBuilder<MyStep> = new ProtocolBuilder()

        pB.setStepCloner((step: MyStep) => ({ val: new MyValue(step.val.getValue()) }))

        let stepValue: MyStep = { val: new MyValue('') }
        stepValue.val = new MyValue('step a')
        pB.step(stepValue)
        stepValue.val = new MyValue('step b')
        pB.step(stepValue)

        expect(pB.build()).to.deep.equal(expected)
        expect(pB.build().steps[0].val.getValue()).to.equal('step a')
        expect(pB.build().steps[1].val.getValue()).to.equal('step b')
    })
})
