export type Inbox<T> = {
  messages: T[]
}

export function send(inbox: Inbox<any>, message: any): void {
  inbox.messages.push(message)
}

export function receive<T>(inbox: Inbox<T>): Promise<T> {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const message = inbox.messages.shift()
      if (message) {
        resolve(message)
        clearInterval(interval)
      }
    }, 10)
  })
}

export function inbox<T>(): Inbox<T> {
  return {
    messages: []
  }
}
