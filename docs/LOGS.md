Development Log / Notes
- 8/8/23: `/` now fetches data from `/services` instead of internal api
- 8/8/23: Currently, there are two routes for solo project detail page
  - `/solo-project/[id]`: this uses the api route `/api/soloprojects/[id]` and fetch with swr in a client component, and will be replaced by the new route
  - `/solo-project-new/[id]`: this fetches data from airtable directly using `services/soloProjects`, with a server component fetching the data, handling updates, and passing it to a client component for display and styling
- 12/8/23 - use revalidate api doesn't work as user has to refresh the page to update
- 25/9/23 - there seem to be an issue with subsequent deployments with puppeteer, but it will work if a manual redeploy (without cache)
- 25/9/23 - doesn't work on netlify (login loop), added new github oauth app for netlify, callback url should be correct
