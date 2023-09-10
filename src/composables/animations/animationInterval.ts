import { useTimeoutIntervalTimer } from '@/composables/animations/intervalTimer/timeoutIntervalTimer'
import { useAnimationFrameIntervalTimer } from '@/composables/animations/intervalTimer/animationFrameIntervalTimer'

export function useAnimationInterval(...args) {
    if (import.meta.env.VITE_PLAYBACK_IMPLEMENTATION === 'animation-frame') {
        return useAnimationFrameIntervalTimer(...args)
    } else {
        return useTimeoutIntervalTimer(...args)
    }
}
