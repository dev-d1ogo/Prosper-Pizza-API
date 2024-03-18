import 'dotenv/config'

import * as zod from 'zod'

const envSchema = zod.object({
    NODE_ENV: zod.enum(["development", "test", "production"]).default('production'),
    DATABASE_URL: zod.string(),
    PORT: zod.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('⚠ Invalid enviroment variables!', _env.error.format())

    throw new Error ('Invalid enviroment variables')
}
export const env = _env.data

