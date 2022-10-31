import { useEffect } from 'react'

export const useScrollLock = (visible) => {
  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--scrollbarWidth', window.innerWidth - document.documentElement.clientWidth + 'px')
      document.documentElement.classList.add('is-scroll-lock')
    } else {
      document.documentElement.classList.remove('is-scroll-lock')
    }

    return () => {
      document.documentElement.classList.remove('is-scroll-lock')
    }
  }, [visible])
}