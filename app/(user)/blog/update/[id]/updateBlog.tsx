"use client";
import SectionModal from "@/app/_components/blog/SectionModal";
import { useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useUser } from "@/app/_stores/user/hooks";
import SectionDropdown from "@/app/_components/blog/SectionDropdown";
import { toast } from "react-hot-toast";
import { Blog, Section, User } from "@/app/types";
import FileInput from "@/app/_components/blog/FileInput";
import Image from "next/image";
import { uploadImage } from "@/app/_api/upload";
import { useRouter } from "next/navigation";
import { addBlog, updateBlog } from "@/app/_api/blog";
import { formatDateForShow } from "@/app/_lib/utils";
import { RxCrossCircled } from "react-icons/rx";

interface Props {
  blog: Blog;
}

export default function UpdateBlog({ blog }: Props) {
  const [sections, setSections] = useState<Section[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [tag, setTag] = useState("");
  const user: User = useUser();
  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setSections(blog?.sections);
      setFile(blog?.image);
    }
  }, [blog]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    const url = URL.createObjectURL(file);
    setFile(file);
    setFileUrl(url);
  };

  const handleTagChange = (e: any) => {
    setTag(e.target.value);
  };

  const removeImage = () => {
    setFile("");
    setFileUrl("");
    formik.values.image = "";
    //     handleImageChange();
  };

  const formik = useFormik({
    initialValues: blog,
    enableReinitialize: true,
    onSubmit: async (values) => {
      values.authorId = user?.id;
      values.sections = sections;

      if (fileUrl) {
        const formData = new FormData();
        formData.append("image", file);
        const data = await uploadImage(formData);
        values.image = data.url;
      }

      console.log(`values`, values);

      try {
        const res = await updateBlog(blog.id, values);
        router.push(`/`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDelete = (elementToDelete: any) => {
    const filteredArray = sections.filter((item) => item !== elementToDelete);
    setSections(filteredArray);
  };

  const handleDeleteTag = (elementToDelete: any) => {
    const filteredArray = formik?.values?.tags?.filter(
      (item) => item !== elementToDelete
    );
    formik.setFieldValue("tags", filteredArray);
  };

  return (
    <div className="flex flex-col min-h-[110vh] gap-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full items-center justify-center gap-4"
      >
        <div className="flex flex-col text-center gap-4">
          <textarea
            onChange={formik.handleChange}
            name="title"
            value={formik.values.title}
            autoComplete="false"
            rows={3}
            maxLength={40}
            cols={25}
            className="custom-input p-0 font-extrabold dark:bg-dark-color text-center text-5xl resize-none  border-none shadow-none focus:outline-none focus:ring-0"
            placeholder="Main Title"
          />
          <div>
            <p className="opacity-75">
              {formatDateForShow(new Date().toDateString())}
            </p>
          </div>
          <h1 className="text-4xl font-extrabold">. . .</h1>
        </div>
        {!file && !formik.values.image ? (
          <FileInput onChange={handleImageChange} name={"image"} />
        ) : (
          <>
            <div className="w-full relative  h-[400px]">
              <Image
                src={fileUrl ? fileUrl : blog?.image}
                alt="blog image"
                className="rounded-lg"
                objectFit="cover"
                fill
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage()}
              className="custom-button w-fit text-white dark:bg-red-900 bg-red-600"
            >
              Remove
            </button>
          </>
        )}
        <div className="flex flex-col gap-4 w-full">
          {sections.map((section: any, index) => (
            <div
              key={index}
              className="self-start flex justify-between items-center flex-row w-full"
            >
              {section.type !== "IMAGE" ? (
                <div>
                  <h3 className="font-semibold text-3xl">{section?.title}</h3>
                  <div className="w-full content">{section?.content}</div>
                </div>
              ) : (
                <div className="w-full relative  h-[400px]">
                  <Image
                    src={section?.image}
                    alt="blog image"
                    className="rounded-lg"
                    fill
                    objectFit="contain"
                  />
                </div>
              )}
              <div className="">
                <button
                  type="button"
                  onClick={() => handleDelete(section)}
                  className="custom-button w-fit text-white dark:bg-red-900 bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center">
          <SectionDropdown setType={setType} setIsOpen={setIsOpen} />
        </div>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            onChange={handleTagChange}
            value={tag}
            name="tag"
            id="tag"
            className="custom-input"
          />
          {formik?.values?.tags?.map((tag, i) => (
            <span
              className="badge flex-flex-row  items-center text-lg gap-1"
              key={i}
            >
              {tag}{" "}
              <button type="button" onClick={() => handleDeleteTag(tag)}>
                <RxCrossCircled />
              </button>
            </span>
          ))}
          <button
            className="custom-button"
            type="button"
            onClick={() => {
              formik.setFieldValue("tags", [...formik.values.tags, tag]);
              setTag("");
            }}
          >
            Add Tag
          </button>
        </div>
        <button
          type="submit"
          className="w-1/2 custom-button bg-green-600 dark:bg-green-800 text-white mt-5"
        >
          Update
        </button>
      </form>

      <SectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sections={sections}
        setSections={setSections}
        type={type}
      />
    </div>
  );
}
