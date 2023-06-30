export function isPublicPath(path: string): boolean {
    const publicPaths = ['/main', '/register-login', '/sign-up', '/dev', '/dev/docs', '/dev/open-ticket', '/loading']
  
    for (const publicPath of publicPaths) {
      if  (publicPath === path) return true
    }
    return false
  }