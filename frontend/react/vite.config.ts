import react from "@vitejs/plugin-react"
import { defineConfig, ProxyOptions, UserConfig } from "vite"

function createProxy(port: string): Record<string, ProxyOptions> {
  return {
    "/api": {
      target: `http://localhost:${port}`,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  }
}

const getProxyConfiguration = (
  mode: string,
): Record<string, ProxyOptions> | {} => {
  switch (mode) {
    case "mock":
      return createProxy("1080")
    case "kotlin":
      return createProxy("8080")
    case "java":
      return createProxy("8081")
    case "c#":
      return createProxy("8080")
    default:
      return {} // Return an empty object for types compatibility instead of undefined
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }): UserConfig => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      proxy: getProxyConfiguration(mode),
    },
  }
})
