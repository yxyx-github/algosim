import { useTimeoutIntervalTimer } from '@/composables/animations/intervalTimer/timeoutIntervalTimer'
import { useAnimationFrameIntervalTimer } from '@/composables/animations/intervalTimer/animationFrameIntervalTimer'

export function useAnimationInterval(cb: () => void, next: () => boolean, duration: number | (() => number)) {
    if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
        return useAnimationFrameIntervalTimer(cb, next, duration)
    } else {
        return useTimeoutIntervalTimer(cb, next, duration)
    }
}
