import { createContext, useContext, useReducer, type ReactNode } from 'react'

export type Timer = {
  name: string
  duration: number
}
type TimersState = {
  isRunning: boolean
  timers: Timer[]
}
const initialState: TimersState = {
  isRunning: true,
  timers: [],
}
type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void
  startTimers: () => void
  stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null)

// custom hook
export function useTimersContext() {
  const timersCtx = useContext(TimersContext)
  if (timersCtx === null) {
    throw new Error('timersCtx is null-- that should not be the case!')
  }
  return timersCtx
}

type TimersContextProviderProps = { children: ReactNode }

type AddTimerAction = { type: 'ADD_TIMER'; payload: Timer }
type StartTimerAction = { type: 'START_TIMER' }
type StopTimerAction = { type: 'STOP_TIMER' }
type Action = AddTimerAction | StartTimerAction | StopTimerAction
function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type == 'START_TIMER') {
    return { ...state, isRunning: true }
  }
  if (action.type == 'STOP_TIMER') {
    return { ...state, isRunning: false }
  }
  if (action.type == 'ADD_TIMER') {
    // const timers=[...state.timers,action.payload]
    return { ...state, timers: [...state.timers, action.payload] }
  }
  return state
}


export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {

  const [timersState, dispatch] = useReducer(timersReducer, initialState)
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: 'ADD_TIMER', payload: timerData })
    },
    startTimers() {
      dispatch({ type: 'START_TIMER' })
    },
    stopTimers() {
      dispatch({ type: 'STOP_TIMER' })
    },
  }

  return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}
