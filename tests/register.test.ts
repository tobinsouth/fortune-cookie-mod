import { describe, expect, mock, test } from 'claude-code/testing'

import { FORTUNES } from '../hooks/fortunes'

describe('register', () => {
  test('/fortune answers with the fortune the clock picks, and toasts it', async ($, on) => {
    const registered: string[] = []
    const toasts: string[] = []
    const clock = mock.clock(on)
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => {
      registered.push(e.name)

      return { value: { command: e.name } }
    })
    on('ui.toast', ($, e) => {
      toasts.push(e.text)

      return { value: undefined }
    })

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
    await clock.set(FORTUNES.length + 3)
    const { text } = await $.command.run({
      command: 'fortune',
      args: '',
      origin: { kind: 'composer' },
      presentation: { isFullscreen: false, columns: 80 },
    })

    expect(registered).toEqual(['fortune'])
    expect(text).toBe(`🥠 ${FORTUNES[3]}`)
    expect(toasts).toEqual([`🥠 ${FORTUNES[3]}`])
  })
})
