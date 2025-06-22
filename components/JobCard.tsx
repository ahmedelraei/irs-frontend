import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
}

export const JobCard = ({
  title,
  company,
  location,
  description,
}: JobCardProps) => {
  const truncatedDescription =
    description.length > 200 ? description.slice(0, 200) + "..." : description;

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="company logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">
            {company ?? "Unknown Inc"}, {location ?? "Cairo, Egypt"}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{truncatedDescription}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4143456087"
        >
          Apply
        </Link>
      </CardFooter>
    </Card>
  );
};
