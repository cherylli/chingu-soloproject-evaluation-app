# add custom property to columnMeta, e.g. className
https://github.com/TanStack/table/discussions/4824

# meta vs cell
- meta is not for dynamic per-row logic. It's for attaching static metadata.
- Use cell if you want to render values differently based on their value (like styling based on role).