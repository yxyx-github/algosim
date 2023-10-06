import { ref, toValue } from 'vue'

export function useTimeoutIntervalTimer(cb: () => void, next: () => boolean, duration: number | (() => number)) {

    const timeout = ref<ReturnType<typeof setTimeout> | null>(null)

    function start() {
        if (timeout.value === null) {
            timeout.value = setTimeout(continuePlayback, toValue(duration))
        }
    }

    function stop() {
        if (timeout.value !== null) {
            clearTimeout(timeout.value)
            timeout.value = null
        }
    }

    function nextAnimationStep() {
        timeout.value = setTimeout(continuePlayback, toValue(duration))
    }

    function continuePlayback() {
        if (next()) {
            cb()
            nextAnimationStep()
        } else {
            stop()
        }
    }

    return {
        start, stop
    }
}
