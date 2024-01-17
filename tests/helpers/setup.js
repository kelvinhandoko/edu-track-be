import { beforeEach, afterAll } from "vitest"
import resetDb from "./resetDb"

beforeEach(async () => {
    await resetDb()
})
