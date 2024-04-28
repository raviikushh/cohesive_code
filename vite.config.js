import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import monacoEditorPlugin from 'monaco-editor-webpack-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
  ,    monacoEditorPlugin.default({
    languages: ['javascript', 'python', 'java', 'cpp', 'csharp'] // Add the languages you want to support
  })],
  worker: {
    plugins: [
      monacoEditorPlugin.default({
        languages: ['javascript', 'python', 'java', 'cpp', 'csharp'] // Add the languages you want to support
      })
    ]
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
