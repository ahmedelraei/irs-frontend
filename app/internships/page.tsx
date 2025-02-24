"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobCard = ({ title, company, location, description }: JobCardProps) => {
  const truncatedDescription = description.length > 200 ? description.slice(0, 200) + "..." : description;
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
          <p className="text-small text-default-500">{company}, {location}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{truncatedDescription}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4143456087">
          Apply
        </Link>
      </CardFooter>
    </Card>
  );
};

const JobSearchPage = () => {
  const [internships, setInternships] = useState<JobCardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const jobDescription = `We’re looking for a Junior Web Scraping Developer to join our client’s team. If you’re a curious, detail-oriented developer with a passion for working with web technologies and data, this role will allow you to build, maintain, and optimize web scraping scripts that extract valuable insights for the business. You’ll gain exposure to large-scale data extraction techniques while working closely with experienced engineers to refine and improve scraping methodologies.

Key Responsibilities

Web Scraping Development – Build and maintain web scrapers using React, Java, or .NET to extract structured data from web sources.
Data Extraction & Processing – Work with APIs and web page parsing techniques to collect and clean large datasets.
Front-End Parsing – Identify and extract relevant data from web pages by analyzing HTML, JavaScript, and structured elements.
Bug Fixing & Optimization – Debug and refine scraping scripts to improve efficiency, reliability, and data accuracy.
Performance & Compliance – Ensure scrapers operate efficiently while minimizing risks such as IP blocking and CAPTCHA detection.
Collaboration & Learning – Work alongside senior engineers to enhance scraping methodologies and develop best practices.

Minimum Qualifications

Programming Experience – Proficiency in React, Java, or .NET, with a focus on front-end or back-end web development.
Basic Web Scraping Knowledge – Familiarity with libraries and frameworks such as Puppeteer, BeautifulSoup, Scrapy, or Selenium.
API Integration – Experience working with REST APIs, handling JSON/XML data formats, and making HTTP requests.
Problem-Solving Mindset – Ability to analyze data extraction challenges and propose technical solutions.
English Communication – Strong written and verbal communication skills to collaborate effectively within a remote team.

Company Benefits

Top-of-the-market pay.
Remote working.
Potential for flexible hours.
Becoming a part of Palm Outsourcing, where your performance is rewarded in long-term job security and continued growth opportunities.`;

    // Generate 50 dummy internships all with the same detailed description
    const dummyInternships: JobCardProps[] = Array.from({ length: 50 }, () => ({
      title: "Junior Web Scraping Developer",
      company: "Palm Outsourcing",
      location: "Remote",
      description: jobDescription
    }));
    // Simulate fetching data with a delay
    const timer = setTimeout(() => {
      setInternships(dummyInternships);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
      ) {
        setVisibleCount((prev) => Math.min(internships.length, prev + 5));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [internships.length]);

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Based on your profile...</h1>
      <div className="w-full flex flex-col gap-4">
        {internships.slice(0, visibleCount).map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobSearchPage;
