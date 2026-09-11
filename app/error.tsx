"use client"

import React, { useEffect } from "react"

type Props = {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <button onClick={() => reset()} style={{ marginTop: 12 }}>Try again</button>
    </div>
  )
}
