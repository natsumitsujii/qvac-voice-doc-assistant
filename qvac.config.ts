import { defineConfig } from "@qvac/sdk"
import { PLUGIN_LLM, PLUGIN_WHISPER } from "@qvac/sdk"

export default defineConfig({
  plugins: [PLUGIN_LLM, PLUGIN_WHISPER],
  models: {
    downloadDir: "./.qvac/models"
  }
})
