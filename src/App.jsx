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
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    textColor: 'text-white',
    accentColor: 'border-blue-300',
    shadowColor: 'shadow-blue-500/25'
  },
  {
    id: 'lunch',
    label: 'At Lunch',
    icon: UtensilsCrossed,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    textColor: 'text-white',
    accentColor: 'border-orange-300',
    shadowColor: 'shadow-orange-500/25'
  },
  {
    id: 'tea',
    label: 'Tea Break',
    icon: Coffee,
    color: 'bg-gradient-to-br from-amber-500 to-amber-700',
    textColor: 'text-white',
    accentColor: 'border-amber-300',
    shadowColor: 'shadow-amber-500/25'
  },
  {
    id: 'meeting',
    label: 'In Meeting',
    icon: Users,
    color: 'bg-gradient-to-br from-red-500 to-red-700',
    textColor: 'text-white',
    accentColor: 'border-red-300',
    shadowColor: 'shadow-red-500/25'
  },
  {
    id: 'call',
    label: 'On Call',
    icon: Phone,
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    textColor: 'text-white',
    accentColor: 'border-purple-300',
    shadowColor: 'shadow-purple-500/25'
  },
  {
    id: 'out',
    label: 'Stepped Out',
    icon: Car,
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    textColor: 'text-white',
    accentColor: 'border-gray-400',
    shadowColor: 'shadow-gray-500/25'
  },
  {
    id: 'home',
    label: ' Go To Prayer ',
    icon: Home,
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    textColor: 'text-white',
    accentColor: 'border-green-300',
    shadowColor: 'shadow-green-500/25'
  },
  {
    id: 'desk',
    label: 'At My Desk',
    icon: Monitor,
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    textColor: 'text-white',
    accentColor: 'border-emerald-300',
    shadowColor: 'shadow-emerald-500/25'
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
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Office Status Board
            </h1>
            <p className="text-white/90 text-xl md:text-2xl">Select your current status to display</p>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statusOptions.map((status) => {
              const IconComponent = status.icon
              return (
                <button
                  key={status.id}
                  onClick={() => selectStatus(status)}
                  className={`${status.color} ${status.textColor} ${status.accentColor} ${status.shadowColor} p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300 group border-2 hover:shadow-3xl hover:border-white/40 hover:shadow-white/20`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                      <IconComponent size={48} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-bold text-lg text-center leading-tight">{status.label}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Clear Status Button */}
          {currentStatus && (
            <div className="text-center mt-12">
              <button
                onClick={clearStatus}
                className="bg-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/30 transition-colors font-medium text-lg border border-white/30 hover:shadow-white/20"
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
    <div className={`min-h-screen ${currentStatus.color} flex flex-col relative overflow-hidden`}>
      {/* Header Bar */}
      <div className="flex justify-between items-center p-6 border-b border-white/30 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-6">
          <div className="bg-white/25 p-3 rounded-full border border-white/30 shadow-lg">
            <StatusIcon size={32} className={currentStatus.textColor} />
          </div>
          <div>
            <h2 className={`${currentStatus.textColor} text-2xl font-bold`}>Current Status</h2>
            <p className={`${currentStatus.textColor} opacity-90`}>Office Status Board</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`${currentStatus.textColor} text-right bg-white/15 backdrop-blur-sm p-4 rounded-2xl border border-white/25`}>
            <p className="text-lg font-medium">{formatDate(currentTime)}</p>
            <p className="text-3xl font-mono font-bold">{formatTime(currentTime)}</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="bg-white/25 p-4 rounded-full hover:bg-white/35 transition-all duration-200 border border-white/30 hover:shadow-white/20"
            title="Change Status"
          >
            <Settings size={24} className={currentStatus.textColor} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-5xl">
          {/* Large Status Display */}
          <div className="mb-12">
            <div className="bg-white/25 backdrop-blur-sm p-16 rounded-full inline-block border border-white/40 shadow-2xl mb-8 hover:shadow-white/20 transition-shadow">
              <StatusIcon size={200} className={`${currentStatus.textColor}`} />
            </div>
            <h1 className={`${currentStatus.textColor} text-8xl md:text-9xl font-black leading-none tracking-tight drop-shadow-lg`}>
              {currentStatus.label}
            </h1>
          </div>

          {/* Status Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Time Card */}
            <div className={`${currentStatus.textColor} bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-lg hover:shadow-white/20 transition-shadow`}>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Clock size={24} />
                <span className="text-lg font-medium">Current Time</span>
              </div>
              <p className="text-3xl font-mono font-bold">{formatTime(currentTime)}</p>
            </div>

            {/* Date Card */}
            <div className={`${currentStatus.textColor} bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-lg hover:shadow-white/20 transition-shadow`}>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                <span className="text-lg font-medium">Today's Date</span>
              </div>
              <p className="text-xl font-medium">{formatDate(currentTime)}</p>
            </div>
          </div>

          {/* Last Updated Info */}
          {lastUpdated && (
            <div className={`${currentStatus.textColor} mt-8 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block border border-white/30 shadow-lg hover:shadow-white/20 transition-shadow`}>
              <div className="flex items-center space-x-3">
                <Clock size={20} />
                <span className="text-lg font-medium">
                  Status updated at {formatTime(lastUpdated)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/30 bg-white/10 backdrop-blur-sm">
        <div className={`${currentStatus.textColor} text-center opacity-90`}>
          <p className="text-lg">Click the ⚙️ icon or anywhere on the status to change</p>
        </div>
      </div>
    </div>
  )
}

export default App
