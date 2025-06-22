"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { JobCard, JobCardProps } from "@/components/JobCard";
import axiosClient from "@/lib/axiosClient";
import LoadingSpinner from "@/components/LoadingSpinner";

const JobSearchPage = () => {
  const [internships, setInternships] = useState<JobCardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");

      return;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        hasMore &&
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.offsetHeight
      ) {
        setVisibleCount((prev) => Math.min(internships.length, prev + 5));

        if (visibleCount + 5 >= internships.length) {
          fetchMoreInternships();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [internships.length, visibleCount, loading, hasMore]);

  const fetchInternships = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const r = await axiosClient.get("/jobs/recommended");

      console.log(r.data);
      setInternships(r.data);
      setHasMore(r.data.length > visibleCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreInternships = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const r = await axiosClient.get(
        `/jobs/recommended?offset=${internships.length}`,
      );
      const newInternships = r.data;

      if (newInternships.length === 0) {
        setHasMore(false);
      } else {
        setInternships((prevInternships) => [
          ...prevInternships,
          ...newInternships,
        ]);
      }
    } catch (err) {
      console.error("Error fetching more internships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Based on your profile...</h1>

      {/* Initial loading state */}
      {loading && internships.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {internships.slice(0, visibleCount).map((job, index) => (
            <JobCard key={index} {...job} />
          ))}

          {/* Loading more internships */}
          {loading && internships.length > 0 && (
            <div className="py-4">
              <LoadingSpinner color="primary" size="md" />
            </div>
          )}

          {/* End of results message */}
          {!hasMore && internships.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              No more internships to load
            </div>
          )}

          {/* No results message */}
          {!loading && internships.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No internships found. Please update your profile to get more
              relevant recommendations.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
