// vitest.config.integration.ts
import { defineConfig } from "vitest/config"
export default defineConfig({
    test: {
        include: ["tests/**/*.test.js", "!/tests"],
        setupFiles: ["/tests/helpers/setup.js"],
        threads: false,
    },
})
