self.onmessage = e => {
    self.postMessage('return: ' + e.data)
}
