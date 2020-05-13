import { useEffect, useState } from 'react'

function useDebounce(value: string, delay = 300) {
  const [inputValue, setInputValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return inputValue
}
export default useDebounce