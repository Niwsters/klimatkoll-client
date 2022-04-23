import { transpose } from './transpose'

export class TransitionGoal {
  readonly timestamp: number
  readonly goal: number

  constructor(timestamp: number, goal: number) {
    this.timestamp = timestamp
    this.goal = goal
  }

  update(timestamp: number, goal: number): TransitionGoal {
    if (this.goal === goal)
      return new TransitionGoal(this.timestamp, this.goal)

    return new TransitionGoal(timestamp, goal)
  }

  transpose(start: number, currentTime: number): number {
    return transpose(start, this.goal, currentTime - this.timestamp)
  }
}
