import CopyButton from '@/components/ui/buttons/CopyButton';
import ExternalLinkButton from '@/components/ui/buttons/ExternalLinkButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import H1 from '@/components/ui/typography/h1';
import links from '@/data/links.json';
import { z } from 'zod';

//region schemas and types
const LinkSchema = z.object({
  name: z.string(),
  url: z.url().default('placeholder link'),
  description: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

const LinkCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  links: z.array(LinkSchema),
});

type LinkCategory = z.infer<typeof LinkCategorySchema>;
type LinkType = z.infer<typeof LinkSchema>;
//endregion

const LinkCategory = ({
  category,
}: {
  category: LinkCategory;
}) => {
  return (
    <>
      <H1>{category.name}</H1>
      {category.links.map((link) => (
        <Card
          key={`${category.id}-${link.name}`}
          className="w-[80vh] m-auto mb-5"
        >
          <CardHeader>
            <CardTitle>{link.name}</CardTitle>
            <CardDescription>
              {link.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <ExternalLinkButton url={link.url} />
            <CopyButton text={link.url} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

const Links = () => {
  return (
    <>
      {links.categories.map((category) => (
        <LinkCategory
          category={category}
          key={category.id}
        />
      ))}
    </>
  );
};

export default Links;
