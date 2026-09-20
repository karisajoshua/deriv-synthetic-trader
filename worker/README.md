# Persistent worker

The production worker is intentionally separated from Vercel request handlers. It will maintain the Deriv WebSocket connection, rolling tick buffers, proposal checks, demo execution and settlement loop.

## Execution invariant
No buy is allowed unless: demo mode is enabled; a current proposal exists; setup threshold is met; expected-value gate passes; stake is within equity/session/recovery caps; and no stop condition is active.

Real-account execution remains disabled until demo evidence is reviewed.
