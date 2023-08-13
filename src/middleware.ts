export {default} from 'next-auth/middleware'

// a matcher is required for newer next.js versions
export const config = {
    matcher: ["/"]
}