import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/app/types";
import { formatDateForShow } from "@/app/_lib/utils";
import { AiOutlineHeart } from "react-icons/ai";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col  w-full pt-1 pb-2 px-2 bg-white dark:bg-dark-color dark:text-white rounded-md shadow-md">
      <Link className="flex flex-col gap-4 group" href={`/blog/${blog?.id}`}>
        <div className="relative h-48 w-72">
          <Image
            src={blog?.image}
            fill
            alt=""
            className="object-cover group-hover:scale-105 transform transition-transform rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-2">
            <h2
              className="text-base
         md:text-lg font-bold
         line-clamp-1
        "
            >
              {blog?.title}
            </h2>
            <div className="flex flex-row items-center">
              {blog?.likes?.length}
              <AiOutlineHeart size={25} />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            {blog?.tags?.map((tag, i) => (
              <span key={i} className="badge w-fit">
                {tag}
              </span>
            ))}
          </div>
          <span className="opacity-70">
            {formatDateForShow(blog?.createdAt)}
          </span>
          {/* <p className="line-clamp-2 font-light">
            {blog.}
          </p> */}
          <div className="mt-2">
            <p className="font-bold">
              {blog?.author?.first_name + " " + blog?.author?.last_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
