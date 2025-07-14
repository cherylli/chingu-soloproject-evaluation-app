'use client'

const dateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
} as const;

const ClientDateTime = () => {
    return(
        <span suppressHydrationWarning>
            {new Intl.DateTimeFormat('en-US', dateFormatOptions).format(new Date())}
        </span>
    )
 }
 
 export default ClientDateTime