import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'os'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [vue()],
    base: './',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      include: ['axios'],
    },
    server: {
      port: 8080,
      cors: true,
      proxy: {
        '/user': {
          target: env.VITE_FORM_URL,
          changeOrigin: true,
          rewrite: (path: string) => {
            return path.replace(/^\/user/, '/api/auth')
          },
        },
        '/info': {
          target: env.VITE_FORM_URL,
          changeOrigin: true,
          rewrite: (path: string) => {
            return path.replace(/^\/info/, '/api/user')
          },
        },
        '/problem': {
          target: env.VITE_FORM_URL,
          changeOrigin: true,
          rewrite: (path: string) => {
            return path.replace(/^\/problem/, '/api/problem')
          },
        },
        '/form': {
          target: env.VITE_FORM_URL,
          changeOrigin: true,
          rewrite: (path: string) => {
            return path.replace(/^\/form/, '/api/form')
          },
        },
      },
    },
  })
}
