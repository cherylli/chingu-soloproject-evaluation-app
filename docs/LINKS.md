https://www.youtube.com/watch?v=8pzIuLFuv6U&ab_channel=PedroTech
https://www.jamesqquick.com/blog/authenticated-jamstack-app-with-next-js-airtable-auth0-and-tailwind-css/

reddit.com/r/typescript/comments/vgrdjm/how_do_you_create_an_interface_for_an_api/

My submission http://localhost:3014/solo-project/recE0bK9sMfG49kRx

Prop `id` did not match. - should be fixed soon. fix is currently in the canary version
https://github.com/shadcn-ui/ui/issues/992

auth: https://www.youtube.com/watch?v=w2h54xz6Ndw&ab_channel=DaveGray


airtable with typescript example (not very good)
https://akoskm.com/create-a-job-board-with-nextjs-13-and-airtable
https://github.com/akoskm/job-board/blob/main/src/app/jobs/%5Bid%5D/page.tsx

toast from server components?
https://stackoverflow.com/questions/76393897/how-to-call-a-notification-toast-after-a-server-action-in-nextjs13

Json schema


## refresh server components
https://www.youtube.com/watch?v=-t3-rG5G5tA&ab_channel=RyanToronto

### RevalidatePath
does two important things: `revalidatePath('/')`
1. Invalidates the current cache for the specified path
2. Triggers a new render of the page, which will automatically re-run all the data fetching code in the components


# add custom property to columnMeta, e.g. className
https://github.com/TanStack/table/discussions/4824

# meta vs cell
- meta is not for dynamic per-row logic. It's for attaching static metadata.
- Use cell if you want to render values differently based on their value (like styling based on role).
