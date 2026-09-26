# QVAC Voice Doc Assistant — On-Device

Offline voice memo app that transcribes on-device and generates docs with no cloud upload. Data never leaves your machine.

Built with Tether QVAC SDK @qvac/sdk 0.19.1

### What it does
Takes any wav/mp3/m4a file, runs loadModel -> transcribe (WHISPER_TINY) on-device, then loadModel -> completion (LLAMA 3.2 1B Q4_0) on-device. Generates Summary / Meeting Notes / Action Items / Email Draft, then unloadModel.

### QVAC functions used
- loadModel (WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0)
- transcribe
- completion
- unloadModel
- Plugins via qvac.config.ts: @qvac/sdk/whispercpp-transcription/plugin and @qvac/sdk/llamacpp-completion/plugin

### Install
npm install
# needs Node.js >= 22.17
npx qvac doctor

### Run
npm start
# or node index.mjs

### Bundle (required for submission)
npx @qvac/cli bundle sdk
# creates qvac/worker.entry.mjs, qvac/worker.bundle.js, qvac/addons.manifest.json

### Why I built it
Private offline meetings where sensitive audio cannot be uploaded to cloud — no API key, no cloud, private by design.
