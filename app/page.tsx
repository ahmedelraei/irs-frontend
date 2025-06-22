"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { title, subtitle } from "@/components/primitives";
import axiosClient from "@/lib/axiosClient";
import { JobCard, JobCardProps } from "@/components/JobCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [internships, setInternships] = React.useState<JobCardProps[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("access_token");

    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const fetchInternships = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const r = await axiosClient.get("/jobs/recommended?offset=0&limit=6");

      setInternships(r.data);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchInternships();
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {loading ? (
          <div className="flex justify-center mt-8">
            <LoadingSpinner color="primary" size="lg" />
          </div>
        ) : isAuthenticated ? (
          <>
            <div className="inline-block max-w-xl text-center justify-center">
              <span className={title()}>Top 6&nbsp;</span>
              <span className={title({ color: "violet" })}>Suitable&nbsp;</span>
              <br />
              <span className={title()}>Opportunities</span>
              <div className={subtitle({ class: "mt-4" })}>
                Discover the Top 6 Handpicked Opportunities Perfectly Tailored
                for You
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {internships.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="inline-block max-w-xl text-center justify-center">
              <span className={title()}>Discover opportunities&nbsp;</span>
              <span className={title({ color: "violet" })}>tailored&nbsp;</span>
              <br />
              <span className={title()}>just for you..</span>
              <div className={subtitle({ class: "mt-4" })}>
                Our AI-powered platform analyzes your skills, interests, and
                resume to match you with the most relevant internships — saving
                you time and boosting your chances of getting hired.
              </div>
              <ul className="text-center list-disc list-inside max-w-md mx-auto mb-6 space-y-2">
                <li>
                  🚀 <strong>Smart Matching</strong>
                </li>
                <li>
                  📄 <strong>Resume Analysis</strong>
                </li>
                <li>
                  📍 <strong>Location-Based Suggestions</strong>
                </li>
                <li>
                  💬 <strong>Real-time Feedback</strong>
                </li>
              </ul>
              <p className="text-lg font-medium">
                Start your journey toward a successful career today — no more
                endless searching!
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
