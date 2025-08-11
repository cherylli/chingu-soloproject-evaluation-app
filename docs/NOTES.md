If we want to fetch specific fields from airtable we can do this.
`fields: soloProjectFields` where soloProjectFields is something like: ["name", "discord id", ...]
which can be constructed using soloProjectField Type
now we just fetch all fields, and "transform" what we need

```ts
const records = await soloProjectTable
  .select({
    filterByFormula: filter,
    fields: soloProjectFields,
  })
  .all();
return transformSoloProjectRecords(records);
```
