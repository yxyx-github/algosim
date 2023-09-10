import { reactive, toValue } from 'vue'

export function useAnimationInterval(cb: () => void, next: () => boolean, duration: number | (() => number)) {
    const state = reactive<{
        timeout: ReturnType<typeof setTimeout> | null
        animationFrame: ReturnType<typeof requestAnimationFrame> | null
        previousTimeStamp: DOMHighResTimeStamp | null,
    }>({
        timeout: null,
        animationFrame: null,
        previousTimeStamp: null,
    })

    function start() {
        if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
            if (state.animationFrame === null) {
                state.animationFrame = requestAnimationFrame(continuePlayback)
            }
        } else {
            if (state.timeout === null) {
                state.timeout = setTimeout(continuePlayback, state.timeoutLength)
            }
        }
    }

    function stop() {
        if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
            if (state.animationFrame !== null) {
                cancelAnimationFrame(state.animationFrame)
            }
            state.animationFrame = null
            state.previousTimeStamp = null
        } else {
            if (state.timeout !== null) {
                clearTimeout(state.timeout)
                state.timeout = null
            }
        }
    }

    function nextAnimationStep() {
        if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
            state.animationFrame = requestAnimationFrame(continuePlayback)
        } else {
            state.timeout = setTimeout(continuePlayback, state.timeoutLength)
        }
    }

    function continuePlayback(timeStamp: DOMHighResTimeStamp = 0) {
        if (next()) {
            if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
                if (state.previousTimeStamp === null) {
                    state.previousTimeStamp = timeStamp
                } else if (timeStamp - state.previousTimeStamp >= toValue(duration)) {
                    cb()
                    state.previousTimeStamp = timeStamp
                }
            } else {
                cb()
            }

            nextAnimationStep()
        } else {
            state.status = 'stopped'
            stopAnimation()
        }
    }

    return {
        start, stop
    }
}
