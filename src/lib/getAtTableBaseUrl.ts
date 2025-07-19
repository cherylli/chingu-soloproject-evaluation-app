// construct airtable base url based on context
type Context =
    |"solo-project"
    |"voyage-signup"
    |"voyage-checkin"

const contextMap: Record<Context, string> = {
    "solo-project": process.env.AIRTABLE_TABLEID!,
    "voyage-signup": process.env.AIRTABLE_VOYAGE_SIGNUP_TABLEID!,
    "voyage-checkin": process.env.AIRTABLE_CHECKIN_TABLEID!
}
export const getAtTableBaseUrl =  (context: Context) => {
    return `https://airtable.com/${process.env.AIRTABLE_BASEID}/${contextMap[context]}`
}