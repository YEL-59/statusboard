import { useState, useEffect } from 'react'
import {
  Coffee,
  UtensilsCrossed,
  Toilet,
  Users,
  Phone,
  Car,
  Clock,
  Home,
  Monitor,
  Settings,
  X
} from 'lucide-react'
import './App.css'

const statusOptions = [
  {
    id: 'washroom',
    label: 'In Washroom',
    icon: Toilet,
    color: 'bg-blue-500',
    textColor: 'text-blue-100'
  },
  {
    id: 'lunch',
    label: 'At Lunch',
    icon: UtensilsCrossed,
    color: 'bg-orange-500',
    textColor: 'text-orange-100'
  },
  {
    id: 'tea',
    label: 'Tea Break',
    icon: Coffee,
    color: 'bg-amber-600',
    textColor: 'text-amber-100'
  },
  {
    id: 'meeting',
    label: 'In Meeting',
    icon: Users,
    color: 'bg-red-500',
    textColor: 'text-red-100'
  },
  {
    id: 'call',
    label: 'On Call',
    icon: Phone,
    color: 'bg-purple-500',
    textColor: 'text-purple-100'
  },
  {
    id: 'out',
    label: 'Stepped Out',
    icon: Car,
    color: 'bg-gray-600',
    textColor: 'text-gray-100'
  },
  {
    id: 'home',
    label: 'Working from Home',
    icon: Home,
    color: 'bg-green-500',
    textColor: 'text-green-100'
  },
  {
    id: 'desk',
    label: 'At My Desk',
    icon: Monitor,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-100'
  }
]

function App() {
  const [currentStatus, setCurrentStatus] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const selectStatus = (status) => {
    setCurrentStatus(status)
    setLastUpdated(new Date())
    setShowSettings(false)
  }

  const clearStatus = () => {
    setCurrentStatus(null)
    setLastUpdated(null)
    setShowSettings(false)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (showSettings || !currentStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Office Status Board</h1>
            <p className="text-white/70 text-lg">Select your current status to display</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statusOptions.map((status) => {
              const IconComponent = status.icon
              return (
                <button
                  key={status.id}
                  onClick={() => selectStatus(status)}
                  className={`${status.color} ${status.textColor} p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200 group`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <IconComponent size={40} className="group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm text-center leading-tight">{status.label}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {currentStatus && (
            <div className="text-center">
              <button
                onClick={clearStatus}
                className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors font-medium"
              >
                Clear Status
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const StatusIcon = currentStatus.icon

  return (
    <div className={`min-h-screen ${currentStatus.color} flex flex-col items-center justify-center relative p-8`}>
      <button
        onClick={() => {
          console.log('Settings button clicked!')
          setShowSettings(true)
        }}
        className="absolute top-6 right-6 bg-white/30 backdrop-blur-sm p-4 rounded-full hover:bg-white/40 transition-all duration-200 group shadow-lg border border-white/20 z-50"
        title="Change Status"
      >
        <Settings size={28} className="text-white group-hover:rotate-90 transition-transform duration-300 drop-shadow-lg" />
      </button>

      <div
        className="text-center space-y-8 cursor-pointer"
        onClick={() => {
          console.log('Status area clicked!')
          setShowSettings(true)
        }}
        title="Click to change status"
      >
        <div className="animate-pulse">
          <StatusIcon size={120} className={`${currentStatus.textColor} mx-auto mb-6`} />
        </div>

        <h1 className={`text-6xl md:text-8xl font-bold ${currentStatus.textColor} mb-4`}>
          {currentStatus.label}
        </h1>

        <div className={`${currentStatus.textColor} space-y-2`}>
          <p className="text-2xl font-medium opacity-90">
            {formatDate(currentTime)}
          </p>
          <p className="text-4xl font-mono font-bold">
            {formatTime(currentTime)}
          </p>
        </div>

        {lastUpdated && (
          <div className={`${currentStatus.textColor} bg-white/10 backdrop-blur rounded-2xl px-6 py-4 inline-block`}>
            <div className="flex items-center space-x-2">
              <Clock size={20} />
              <span className="text-lg">
                Status updated at {formatTime(lastUpdated)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className={`${currentStatus.textColor} text-center opacity-70`}>
          <p className="text-lg">Click anywhere on the status or the ⚙️ icon to change status</p>
        </div>
      </div>
    </div>
  )
}

export default App
