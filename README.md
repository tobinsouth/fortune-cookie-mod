# fortune-cookie

A tiny demo mod for Claude Code. Type `/fortune` and it cracks open a fortune
cookie: one line of coding wisdom, shown in the transcript and as a toast.

    > /fortune
    🥠 It was DNS. It is always DNS.

## Run it from source

    claude --plugin-dir fortune-cookie

## Test it

    claude plugin validate fortune-cookie
    claude plugin test fortune-cookie

## How it works

`hooks/register.ts` registers the `/fortune` command at `session.start` and
answers `command.run` for it. The clock picks the fortune from
`hooks/fortunes.ts`, so the test can pin which one comes out.
