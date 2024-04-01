import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: getWindowWidth(),
    height: getWindowHeight(),
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: getWindowWidth(),
        height: getWindowHeight(),
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

function getWindowWidth() {
  return typeof window !== 'undefined' ? window.innerWidth : 0
}

function getWindowHeight() {
  return typeof window !== 'undefined' ? window.innerHeight : 0
}