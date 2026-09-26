# QVAC Voice Doc Assistant — On-Device

Offline voice memo app that transcribes on-device and generates docs with no cloud upload. Data never leaves your machine.

Built with Tether QVAC SDK @qvac/sdk 0.19.1

### What it does
- Takes any wav/mp3/m4a file
- loadModel -> transcribe (WHISPER_TINY) on-device
- loadModel -> completion (LLAMA 3.2 1B Q4_0) on-device
- Generates Summary / Meeting Notes / Action Items / Email Draft
- unloadModel to free memory

No API key, no usage bill, private by design.

### QVAC functions used
- loadModel (WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0)
- transcribe
- completion
- unloadModel
- PLUGIN_LLM, PLUGIN_WHISPER

### Install
npm install
# needs Node.js >= 22.17
# npx qvac doctor to verify

### Run
npm start
# or node index.mjs
First run downloads models to ~/.qvac/models

### Demo
All inference runs locally - screenshot shows Whisper + LLM loaded on-device.
