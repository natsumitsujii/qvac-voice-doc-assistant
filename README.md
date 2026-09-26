# QVAC Voice Doc Assistant — On-Device

Offline voice memo app that **transcribes on-device and generates docs with no cloud upload**. Data never leaves your machine.

Built with [Tether QVAC SDK](https://github.com/tetherto/qvac) `@qvac/sdk@^0.19.0`

### What it does
- Takes any `wav/mp3/m4a` file
- `loadModel` → `transcribe` (Whisper Tiny) on-device
- `loadModel` → `completion` (Llama 3.2 1B Instruct Q4_0) on-device to generate Summary / Meeting Notes / Action Items / Email Draft

No API key, no usage bill, private by design.

### QVAC functions used
- `loadModel` (WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0)
- `transcribe`
- `completion`
- `unloadModel`

### Install
```bash
npm install
# needs Node.js >= 22.17
