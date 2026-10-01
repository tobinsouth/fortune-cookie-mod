import type { Register } from 'claude-code'

import { FORTUNES } from './fortunes'

const COMMAND = 'fortune'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: COMMAND,
      description: 'Crack open a fortune cookie',
    })

    return next(e)
  })

  on('command.run', { command: COMMAND }, async $ => {
    // The clock picks the fortune, so a test can pin which one comes out.
    const pick = Math.floor(await $.clock.now()) % FORTUNES.length
    const text = `🥠 ${FORTUNES[pick] ?? FORTUNES[0]}`
    $.ui.toast(text)

    return { text }
  })
}
