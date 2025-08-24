# 8) Error Handling & Safeguards

* Disable controls during `executing`.
* Guard empty queue on Run/Step.
* Hard cap queue length (e.g., 50 steps expanded) to avoid marathon runs.
* Debounce Run/Step taps (single flight).
