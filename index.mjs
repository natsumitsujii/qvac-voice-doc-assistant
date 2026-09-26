import { loadModel, transcribe, completion, unloadModel, WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0 } from "@qvac/sdk"
import { existsSync } from "fs"
import readline from "readline"

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q, r))

console.log("🎙️ QVAC Voice Doc Assistant — On-Device")
console.log("No API key, no cloud, data never leaves your machine\n")

// 1. Load Whisper model on-device
console.log("Loading WHISPER_TINY on-device...")
const whisperId = await loadModel({
  modelSrc: WHISPER_TINY,
  modelType: "whispercpp-transcription",
  onProgress: (p) => process.stdout.write(`\r Whisper ${p.percentage?.toFixed(0) || 0}% ${p.status||""} `)
})
console.log("\n✅ Whisper loaded:", whisperId)

// 2. Load LLM model on-device
console.log("\nLoading LLAMA 3.2 1B Instruct Q4_0 on-device...")
const llmId = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  modelType: "llamacpp-completion",
  modelConfig: { ctx_size: 2048 },
  onProgress: (p) => process.stdout.write(`\r LLM ${p.percentage?.toFixed(0) || 0}% ${p.status||""} `)
})
console.log("\n✅ LLM loaded:", llmId)

console.log("\n--- READY ---")
let audioPath = await ask("\nEnter path to audio file (wav/mp3/m4a, e.g../sample.wav) or press Enter for./sample.wav: ")
audioPath = audioPath.trim() || "./sample.wav"

if (!existsSync(audioPath)) {
  console.log(`File not found: ${audioPath}.`)
  console.log("Download test file: curl -L -o sample.wav https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav")
  process.exit(1)
}

console.log(`\n🎧 Transcribing ${audioPath} on-device...`)
const text = await transcribe({ modelId: whisperId, audioChunk: audioPath })
console.log("\n📝 Transcript:\n", String(text))

const action = await ask("\nWhat to generate? [1] Summary [2] Meeting Notes [3] Action Items [4] Email Draft (default 2): ")
const map = {
  "1": "Summarize this transcript in bullet points: ",
  "2": "Create meeting notes with attendees, key points, decisions, action items from: ",
  "3": "Extract action items and deadlines from: ",
  "4": "Write a professional email draft based on: "
}
const prefix = map[action.trim() || "2"]
const prompt = prefix + String(text)

console.log("\n🤖 Generating with completion() on-device...\n")
const run = completion({
  modelId: llmId,
  history: [{ role: "user", content: prompt }],
  stream: true
})

let full = ""
for await (const token of run.tokenStream) {
  process.stdout.write(token)
  full += token
}

console.log("\n\n✅ Done — all inference ran on-device")
await unloadModel({ modelId: whisperId })
await unloadModel({ modelId: llmId })
rl.close()
