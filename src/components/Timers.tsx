import { useTimersContext } from '../store/timers-context'
import Timer from './Timer'

export default function Timers() {
  const { timers } = useTimersContext()
  return (
    <ul>
      {timers.map((ele,id) => (
        <li key={id}>
          <Timer {...ele}></Timer>
        </li>
      ))}
    </ul>
  )
}