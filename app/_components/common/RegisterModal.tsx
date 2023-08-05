"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { authLogin } from "../../_api/auth";
import { useRouter } from "next/navigation";
import { login } from "../../_stores/user/actions";
import { toast } from "react-toastify";
import { createUser } from "@/app/_api/user";
import Link from "next/link";

export default function RegisterModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [formData, setFormData] = useState({});
  const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await createUser(formData);
      if (response.status === 200) {
        toast.success("Register successfully");
        router.push("/");
      } else {
        console.log(response);
        toast.error(response.response.data.message);
      }
    } catch (error: any) {
      toast.error("err");
      console.log(error);
    }
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <Link
          href={"/register"}
          // type="button"
          // onClick={openModal}
          className="nav-item"
        >
          Register
        </Link>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md  overflow-hidden rounded-2xl bg-light-color dark:bg-dark-color p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl text-center font-bold leading-6 border-b-2 pb-2  text-dark-color dark:text-light-color"
                  >
                    Register
                  </Dialog.Title>
                  <div className="flex flex-col">
                    <form
                      onSubmit={handleSubmit}
                      className="flex border-b-2 rounded-md md:p-10 p-4  gap-4 w-full bg flex-col"
                      action=""
                    >
                      <input
                        type="text"
                        name="first_name"
                        className="custom-input"
                        placeholder="First name"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        name="last_name"
                        className="custom-input"
                        placeholder="Last name"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <input
                        type="email"
                        name="email"
                        className="custom-input"
                        placeholder="Email"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <input
                        type="password"
                        name="password"
                        className="custom-input"
                        placeholder=" Password"
                        onChange={handleChange}
                        autoComplete="off"
                      />

                      <button
                        className="custom-button"
                        onClick={() => closeModal()}
                        type="submit"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
