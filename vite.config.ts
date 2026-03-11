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
      port: parseInt(env.VITE_PORT) || 3000,
      allowedHosts: [
        'health.localhost.lewisle.com'
      ]
    },
    define: {
        // 1. First, define the process.env object so it exists in the browser
        'process.env': {}, 
        
        // 2. Then define your specific variables
        'process.env.FINN_API': JSON.stringify(env['env.FINN_API']),
        'process.env.API_KEY': JSON.stringify(env['env.API_KEY']),
        'process.env.GENERIC_AUTHENTICATOR': JSON.stringify(env['env.GENERIC_AUTHENTICATOR']),
        __APP_ENV__: JSON.stringify(env.APP_ENV),
      },
  };
})
