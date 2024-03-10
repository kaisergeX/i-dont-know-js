/**
 * What is the output of the following code?
 */

Promise.resolve().then(() => console.log(1));

setTimeout(() => {
  setTimeout(() => console.log(2), 0);
  console.log(3);
}, 0);

queueMicrotask(() => console.log(4));

console.log(5);

new Promise(() => console.log(6)).then(() => console.log(7));

(async () => console.log(8))();

/**
 *
 * ========================================================
 * ================ ANSWER & EXPLANATION ==================
 * ========================================================
 *
 * Related keywords: Call stack, Event Loop, Microtask, Macrotask.
 *
 * Breakdown:
 * 1. Call stack: Promise.resolve().then(() => console.log(1))
 *    The promise is resolved immediately, and "then", the callback is added to the microtask queue.
 *
 *    → Microtask queue: [() => console.log(1)]
 *
 * 2. Call stack saw `setTimeout`, lets schedules and call to the Web API (or Node's timer API depending on the env).
 *    Call stack: Done and next.
 *
 * 3. - `queueMicrotask` is called, and the callback is added to the microtask queue.
 *    - Web API: Oh, timeout = 0. Hey, it's time to execute the callback.
 *
 *    Call stack: put it into the macrotask queue. Continue...
 *
 *    → Microtask queue: [() => console.log(1), () => console.log(4)]
 *      Macrotask queue: [() => { setTimeout(() => console.log(2), 0); console.log(3) }]
 *
 * 4. Normal function call: log 5 to the console.
 *
 *    → 5
 *
 * 5. `new Promise` contructor is called. The contructor body runs synchronously, so () => console.log(6) is executed immediately.
 *
 *    → 5 6
 *
 * 6. IIFE, immediately invoked `async () => console.log(8)`. The body of async function run synchronously.
 *
 *    → 5 6 8
 *
 * 7. Are there any things need to be called in the stack? No. Let's check the queues.
 *    Microtask is higher priority than macrotask.
 *
 *    → 5 6 8 1
 *
 * 8.
 *    → 5 6 8 1 4
 *
 *    Microtask queue is empty. Let's check the macrotask queue.
 *
 * 9. Call stack: () => {
 *                  setTimeout(() => console.log(2), 0);
 *                  console.log(3)
 *                }
 *
 *    setTimeout again? Next.
 *
 * 10.
 *    → 5 6 8 1 4 3
 *    Put () => console.log(2) into the macrotask queue.
 *
 * 11. Call stack: Anything else? No? Let's check the queues.
 *    → 5 6 8 1 4 3 2
 *
 * ========================================================
 * Answer: 5 6 8 1 4 3 2
 * ========================================================
 *
 * Wait! Where is the number 7?
 *
 * There is no `resolve` call in the promise constructor. So, no "then".
 */
