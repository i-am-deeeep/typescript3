import Container from './UI/Container.tsx'
import {
  Timer as TimerProps,
  useTimersContext,
} from '../store/timers-context.tsx'
import { useEffect, useRef, useState } from 'react'

export default function Timer({ name, duration }: TimerProps) {
  const { isRunning } = useTimersContext()
  const interval = useRef<number | null>(null)
  const [remainingTime, setRemainingTime] = useState(duration * 1000)
  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current)
  }
  useEffect(() => {
    let timer: number
    if (isRunning) {
      timer = setInterval(function () {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            return prev
          }
          return prev - 50
        })
      }, 50)
      interval.current = timer
    } else if (interval.current) {
      clearInterval(interval.current)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2)

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime}></progress>
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  )
}
