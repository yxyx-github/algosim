import { ref, toValue } from 'vue'

export function useAnimationFrameIntervalTimer(cb: () => void, next: () => boolean, duration: number | (() => number)) {

    const animationFrame = ref<ReturnType<typeof requestAnimationFrame> | null>(null)
    const previousTimeStamp = ref< DOMHighResTimeStamp | null>(null)

    function start() {
        if (animationFrame.value === null) {
            animationFrame.value = requestAnimationFrame(continuePlayback)
        }
    }

    function stop() {
        if (animationFrame.value !== null) {
            cancelAnimationFrame(animationFrame.value)
        }
        animationFrame.value = null
        previousTimeStamp.value = null
    }

    function nextAnimationStep() {
        animationFrame.value = requestAnimationFrame(continuePlayback)
    }

    function continuePlayback(timeStamp: DOMHighResTimeStamp = 0) {
        if (next()) {
            if (previousTimeStamp.value === null) {
                previousTimeStamp.value = timeStamp
            } else if (timeStamp - previousTimeStamp.value >= toValue(duration)) {
                cb()
                previousTimeStamp.value = timeStamp
            }
            nextAnimationStep()
        } else {
            stop()
        }
    }

    return {
        start, stop
    }
}
