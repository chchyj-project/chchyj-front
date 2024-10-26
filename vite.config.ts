import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 로컬 IP로 접근할 수 있게 허용
    port: 3000, // 필요한 경우 포트를 지정
  },
})
