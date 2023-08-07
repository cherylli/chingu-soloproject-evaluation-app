
Features:
- Authentication using github, which also checks against airtable that the user is authorized to view the website. By using next-auth github provider, we do not need to store user passwords in airtable (which is not secure)


TODO: 
- [ ] Add a better display for save success
- [ ] Add auth
  - [ ] Add Evaluator Email to auth context
  - [ ] (Possibly) Role based auth
- [ ] Protect API routes
- [ ] Show and add comments
- [ ] refactor to fetch data directly, instead of using internal API routes
- [ ] Copy and paste line for discord "ring-the-bell"
- [ ] Imports feedback from github repo and make it searchable 
- [ ] To eliminate internal API routes, single project page `solo-project/[id]/page.tsx` will need to be restructured to have a server component fetching data with a client component displaying the data (so we don't have to expose the airtable API key in frontend)
- [ ] Add context for functions like setEvaluator, update record instead of passing as props