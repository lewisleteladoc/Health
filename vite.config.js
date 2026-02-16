import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
  server: {
    hot: true,
    // allowedHosts: true,
    port: parseInt(env.VITE_PORT) || 5000,
    allowedHosts: [
      'health.localhost.lewisle.com'
    ]
  },
  define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
})
