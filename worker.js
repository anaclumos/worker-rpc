const Status = {
  UNINITIALISED: 0,
  READY: 1,
  COMPLETED: 2,
  ERROR: 3,
}

function sleep(ms) {
  const end = Date.now() + ms
  while (Date.now() < end) {}
  return Date.now()
}

// polyfill layer for Worker.Prompt
function prompt(msg) {
  const sab = new SharedArrayBuffer(1024)
  const int32 = new Int32Array(sab)
  Atomics.store(int32, 0, Status.READY)
  postMessage({
    sharedArrayBuffer: sab,
    func: 'prompt',
    msg: msg,
  })

  // Waiting
  Atomics.wait(int32, 0, Status.READY)

  // Waiting complete, get the result
  const ab = new ArrayBuffer(sab.byteLength)
  const view = new Uint8Array(ab)
  view.set(new Uint8Array(sab))
  const decoder = new TextDecoder()
  const string = decoder.decode(view)
  console.log('WORKER recieved result:', string)
}

const timeToWait = Math.floor(Math.random() * 10000)
console.log('WORKER.sleep', timeToWait)
sleep(timeToWait)
prompt('hello!')
