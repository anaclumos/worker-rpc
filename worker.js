postMessage('Worker is ready!')

let sab = undefined
let int32 = undefined

onmessage = function (e) {
  console.log('WORKER.onMessage:', e.data)
  if (e.data?.type === 'init') {
    sab = e.data.sab
    int32 = new Int32Array(sab)
    console.log('Received SAB')
    heartbeat()
  }
  postMessage(`I am a worker. Hello, ${JSON.stringify(e.data)}.`)
}

function heartbeat() {
  setInterval(() => {
    Atomics.wait(int32, 0, 0) // doesn't beat if [0] is 0
    console.log('WORKER.heartbeat:', Atomics.load(int32, 0))
    Atomics.add(int32, 0, 1)
  }, 1000)
}
