export function isPublicPath(path: string): boolean {
  const publicPaths = ['/main', '/dev', '/dev/docs', '/dev/open-ticket', '/loading']

  for (const publicPath of publicPaths) {
    if (publicPath === path) return true
  }
  return false
}

export function isDeviceDesktop(): boolean {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 768
  }
  return false
}
