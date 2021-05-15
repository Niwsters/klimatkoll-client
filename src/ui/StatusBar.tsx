import React from 'react'

export function StatusBar(props: { status: string }) {
  const statusMessage: string = props.status

  return (
    <div id="status-bar">
      <div className="status-bar-message">
        { statusMessage }
      </div>
    </div>
  )
}
