import { useState, useEffect } from 'react'
import { Button, Card, Typography } from 'antd'

const { Title, Text } = Typography

function TugOfWarApp() {
  const [position, setPosition] = useState(0) // -50 to 50, 0 is center
  const [leftScore, setLeftScore] = useState(0)
  const [rightScore, setRightScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')

  const WINNING_POSITION = 40
  const ROPE_LENGTH = 100

  useEffect(() => {
    if (position <= -WINNING_POSITION) {
      setGameOver(true)
      setWinner('Left Team')
      setLeftScore(prev => prev + 1)
    } else if (position >= WINNING_POSITION) {
      setGameOver(true)
      setWinner('Right Team')
      setRightScore(prev => prev + 1)
    }
  }, [position])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        pullLeft()
      } else if (event.key === 'ArrowRight') {
        pullRight()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver])

  const pullLeft = () => {
    if (!gameOver) {
      setPosition(prev => Math.max(prev - 2, -50))
    }
  }

  const pullRight = () => {
    if (!gameOver) {
      setPosition(prev => Math.min(prev + 2, 50))
    }
  }

  const resetGame = () => {
    setPosition(0)
    setGameOver(false)
    setWinner('')
  }

  const resetScores = () => {
    setLeftScore(0)
    setRightScore(0)
    resetGame()
  }

  const markerPosition = ((position + 50) / 100) * ROPE_LENGTH

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-400 p-4">
      <div className="max-w-4xl mx-auto">
        <Title level={1} className="text-center text-white mb-8">
          🪢 Tug of War 🪢
        </Title>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <Text strong className="text-2xl text-blue-600">Left Team</Text>
              <div className="text-3xl font-bold text-blue-800">{leftScore}</div>
            </div>
            <div className="text-center">
              <Text strong className="text-2xl text-red-600">Right Team</Text>
              <div className="text-3xl font-bold text-red-800">{rightScore}</div>
            </div>
          </div>

          {gameOver && (
            <div className="text-center mb-4">
              <Title level={2} className="text-green-600 mb-2">
                🎉 {winner} Wins! 🎉
              </Title>
            </div>
          )}

          <div className="relative mb-8 bg-yellow-100 rounded-lg p-4">
            <div className="flex items-center justify-center relative h-16">
              <div 
                className="absolute bg-amber-700 rounded-full"
                style={{
                  width: `${ROPE_LENGTH}%`,
                  height: '12px',
                  left: '0%',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              
              <div className="absolute w-1 h-20 bg-gray-400 left-1/2 transform -translate-x-1/2 opacity-50" />
              
              <div 
                className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg transition-all duration-200 z-10"
                style={{
                  left: `${markerPosition}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                <div className="text-4xl">👥</div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>Left Goal</span>
              <span>Center</span>
              <span>Right Goal</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <Button 
              type="primary" 
              size="large"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-4 h-auto text-lg font-bold"
              onClick={pullLeft}
              disabled={gameOver}
            >
              ⬅️ Pull Left!
            </Button>
            
            <Button 
              type="primary" 
              size="large"
              className="bg-red-500 hover:bg-red-600 px-8 py-4 h-auto text-lg font-bold"
              onClick={pullRight}
              disabled={gameOver}
            >
              Pull Right! ➡️
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            {gameOver && (
              <Button 
                type="default" 
                size="large"
                onClick={resetGame}
                className="px-6"
              >
                New Round
              </Button>
            )}
            
            <Button 
              type="default" 
              size="large"
              onClick={resetScores}
              className="px-6"
            >
              Reset Scores
            </Button>
          </div>

          <div className="text-center mt-6 text-gray-600">
            <Text>Click the buttons or use arrow keys to pull the rope! First to pull the marker to their goal wins!</Text>
            <div className="mt-2 text-sm">
              <Text type="secondary">← Left Arrow = Pull Left | Right Arrow = Pull Right →</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TugOfWarApp