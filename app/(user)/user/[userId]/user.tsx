"use client";
import { follow, unfollow } from "@/app/_api/follow";
import BlogCard from "@/app/_components/blog/BlogCard";
import SearchBar from "@/app/_components/home/SearchBar";
import { useUser } from "@/app/_stores/user/hooks";
import { Blog, UserDetails } from "@/app/types";
import { useRouter } from "next/navigation";
import React from "react";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";

const User = ({ user }: { user: UserDetails }) => {
  const blogs = user?.blogs;
  const router = useRouter();
  const authUser = useUser();

  const handleFollow = async (userId: string) => {
    await follow(userId);
    router.refresh();
  };

  const handleUnfollow = async (userId: string) => {
    const res = await unfollow(userId);

    router.refresh();
  };

  const checkIfFollowed = () => {
    if (
      user?.followedBy?.find(
        (follower) => follower?.followerId === authUser?.id
      )
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl font-bold">
          {user?.first_name + " " + user?.last_name}
        </h1>
        {user?.id !== authUser?.id ? (
          !checkIfFollowed() ? (
            <button
              onClick={() => handleFollow(user?.id)}
              className="inline-flex  text-lg flex-row items-center gap-2 custom-button"
            >
              Follow <FiUserPlus />
            </button>
          ) : (
            <button
              onClick={() => handleUnfollow(user?.id)}
              className="inline-flex bg-red-600 dark:bg-red-700  text-white dark:text-white  text-lg flex-row items-center gap-2 custom-button"
            >
              Unfollow <FiUserMinus />
            </button>
          )
        ) : (
          <></>
        )}
        <div className="flex flex-row gap-4 justify-between items-center">
          <p className="font-semibold text-md">
            Followers :{user?.followedBy.length}{" "}
          </p>
          <p className="font-semibold text-md">
            Following :{user?.following?.length}{" "}
          </p>
        </div>
      </div>

      {blogs.length > 0 ? (
        <>
          <p className="font-semibold text-lg ">blogs</p>
          <SearchBar />
          <div className="grid items-center justify-center grid-cols-12 lg:grid-cols-12 gap-6">
            <>
              {blogs.map((blog: Blog, index: any) => (
                <div
                  key={index}
                  className="lg:col-span-4 md:col-span-6 col-span-12"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-semibold ">no blogs to display</h2>
        </>
      )}
    </div>
  );
};

export default User;
