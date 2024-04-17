import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import directusDark from './directus-dark.json'
import directusLight from './directus-light.json'

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    themes: {
      dark: directusDark,
      light: directusDark,
    },
  }
})
