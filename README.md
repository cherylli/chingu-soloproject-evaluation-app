
Features:
- Authentication using github, which also checks against airtable that the user is authorized to view the website. By using next-auth github provider, we do not need to store user passwords in airtable (which is not secure)

Development Log / Notes
- 8/8/23: `/` now fetches data from `/services` instead of internal api
- 8/8/23: Currently, there are two routes for solo project detail page
  - `/solo-project/[id]`: this uses the api route `/api/soloprojects/[id]` and fetch with swr in a client component, and will be replaced by the new route
  - `/solo-project-new/[id]`: this fetches data from airtable directly using `services/soloProjects`, with a server component fetching the data, handling updates, and passing it to a client component for display and styling
- 12/8/23 - use revalidate api doesn't work as user has to refresh the page to update

TODO: 
- [ ] Add a better display for save success
- [ ] Add auth
  - [ ] Add Evaluator Email to auth context, through session callback
  - [ ] (Possibly) Role based auth
- [ ] Protect API routes
- [ ] Show and add comments
- [ ] refactor to fetch data directly, instead of using internal API routes
- [ ] Copy and paste line for discord "ring-the-bell"
- [ ] Imports feedback from github repo and make it searchable 
- [ ] To eliminate internal API routes, single project page `solo-project/[id]/page.tsx` will need to be restructured to have a server component fetching data with a client component displaying the data (so we don't have to expose the airtable API key in frontend)
- [ ] Add context for functions like setEvaluator, update record instead of passing as props