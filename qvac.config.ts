import type { QvacConfig } from "@qvac/sdk";

const config: QvacConfig = {
  plugins: [
    "@qvac/sdk/llamacpp-completion/plugin",
    "@qvac/sdk/whispercpp-transcription/plugin"
  ]
};

export default config;
