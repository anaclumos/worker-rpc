# Worker RPC

## What is this?

- This repo gives a Proof of Concept of a Worker Thread's DOM API access.
- With `SharedArrayBuffer` and `Atomic` operations, a worker thread can have synchronous access to DOM APIs.
- In this example, I have implemented `window.prompt()` and `window.innerHeight()` as synchronous RPCs.
- The worker thread can call `window.prompt()` and `window.innerHeight()` and get the result.

## Running

- Git Clone this repo.
- Run `yarn` in the root directory.
- Run `yarn serve` in the root directory.
- Open `localhost:3000` in your browser.
- Try pressing the buttons.
- Worker Thread will synchronously sleep for 5 seconds, then prompt the user for input.
- Worker Thread then will synchronously sleep for 2 seconds, and get the `innerHeight` of the window.
