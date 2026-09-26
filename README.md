# QVAC Voice Doc Assistant — On-Device

Offline voice memo app that transcribes audio on-device and generates docs with no cloud upload. Data never leaves your machine.

Built for Tether's QVAC Hackathon: Build a local AI app with Tether's QVAC SDK

## QVAC SDK

- **SDK version used:** `@qvac/sdk` **^0.20.0** (see `package.json` - satisfies >=0.19.0 requirement)
- **QVAC functions called:**
    - `loadModel()` — loads on-device models (WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0)
    - `transcribe()` — runs speech-to-text locally with Whisper
    - `completion()` — runs local LLM to generate Summary / Notes / Action Items
    - `unloadModel()` — unloads models to free RAM
- **Plugins via `qvac.config.ts`:**
    - `@qvac/sdk/whispercpp-transcription/plugin`
    - `@qvac/sdk/llamacpp-completion/plugin`
- **All inference runs on-device, no cloud call, no API key**

## What it does

Takes any local `wav/mp3/m4a` file, runs:

1. `loadModel(WHISPER_TINY)` → `transcribe()` → `unloadModel()` — on-device transcription
2. `loadModel(LLAMA_3_2_1B_INST_Q4_0)` → `completion()` → `unloadModel()` — on-device doc generation

Generates:
- Summary
- Meeting Notes
- Action Items
- Email Draft

Use case: Private offline meetings where sensitive audio cannot be uploaded to cloud.

## Install

Requires Node.js >= 22.17

```bash
npm install
npx qvac doctor
```

## Run

```bash
npm start
# or
node index.mjs ./sample.wav
# or with any file
node index.mjs /path/to/your/audio.mp3
```

## Bundle (required for submission)

```bash
npx @qvac/cli bundle sdk
# creates qvac/worker.entry.mjs, qvac/worker.bundle.js, qvac/addons.manifest.json
```

## Why I built it

Private offline meetings where sensitive audio cannot be uploaded to cloud — no API key, no cloud, private by design.
