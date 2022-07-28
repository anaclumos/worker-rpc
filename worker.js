postMessage('Worker is ready!')

let sab = undefined
let int32 = undefined

onmessage = function (e) {
  if (e.data?.type === 'sab') {
    sab = e.data.sab
    int32 = new Int32Array(sab)
  }

  console.log('WORKER.onMessage:', e.data)
  postMessage(`I am a worker. Hello, ${e.data}.`)
}

function slowHelloFromWorker() {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000)
  postMessage('Hello from worker!')
  Atomics.wake(new Int32Array(new SharedArrayBuffer(4)), 0, 1)
}
