let gsapInstance: typeof import('gsap') | null = null

export const getGSAP = async () => {
  if (!gsapInstance) {
    gsapInstance = await import('gsap')
  }
  return gsapInstance.gsap || gsapInstance.default
}

// Pre-load GSAP when idle
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    getGSAP()
  }, { timeout: 2000 })
}