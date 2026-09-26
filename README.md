# QVAC Voice Doc Assistant — On-Device

Offline voice memo -> meeting notes. 100% on-device transcription + LLM, no API key, data never leaves machine.

Built with `@qvac/sdk@^0.19.0` — QVAC is Tether's open-source AI SDK.

**QVAC functions used:** `loadModel`, `transcribe`, `completion`, `unloadModel`
- WHISPER_TINY (whispercpp-transcription)
- LLAMA_3_2_1B_INST_Q4_0 (llm)

**Install:**
```bash
npm install
# Node >=22.17 required
