import { greet } from '@/algorithms/test'

self.onmessage = e => {
    self.postMessage(greet(e.data))
}
