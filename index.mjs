import { loadModel, transcribe, completion, unloadModel, WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0 } from "@qvac/sdk"
import { existsSync } from "fs"
import readline from "readline"
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q, r))

console.log("🎙️ QVAC Voice Doc Assistant — On-Device (no cloud)\n")

const whisperId = await loadModel({
  modelSrc: WHISPER_TINY,
  modelType: "whispercpp-transcription",
  onProgress: p => process.stdout.write(`\r Whisper ${p.percentage?.toFixed(0)||0}% `)
})
console.log("\n✅ Whisper loaded")

const llmId = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  modelType: "llm",
  modelConfig: { ctx_size: 2048 },
  onProgress: p => process.stdout.write(`\r LLM ${p.percentage?.toFixed(0)||0}% `)
})
console.log("\n✅ LLM loaded - READY")

let audioPath = (await ask("\nAudio path (./sample.wav): ")).trim() || "./sample.wav"
if(!existsSync(audioPath)){
  console.log("Run: curl -L -o sample.wav https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav")
  process.exit(1)
}

console.log(`\nTranscribing ${audioPath} on-device...`)
const text = await transcribe({ modelId: whisperId, audioChunk: audioPath })
console.log("\n📝 Transcript:\n", String(text))

console.log("\n🤖 Generating meeting notes with completion() on-device...\n")
const run = completion({
  modelId: llmId,
  history: [{ role: "user", content: "Create meeting notes with key points, decisions, action items from: " + String(text) }],
  stream: true
})
for await (const t of run.tokenStream) process.stdout.write(t)

await unloadModel({ modelId: whisperId })
await unloadModel({ modelId: llmId })
rl.close()
