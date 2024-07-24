"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
// import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { revalidation } from "@/action";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  loginType: z.enum(["user", "product"]),
});

export function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      loginType: "user",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    toast.promise(
      async function () {
        try {
          const provider =
            data.loginType === "user" ? "credentials" : "product-credentials";
          const response = await signIn(provider, {
            email: data.email.toLowerCase(),
            password: data.password,
            redirect: false,
          });
          await revalidation();
          if (!response?.error) {
            if (data.loginType === "user") {
              router.push("/");
            } else if (data.loginType === "product") {
              // Fetch the current product data
              const res = await fetch("/api");
              const result = await res.json();
              if (result.currentProduct) {
                const { _id } = result.currentProduct;
                // Store _id in state or session for later use
                router.push(`/client/project/${_id}`);
              }
            }
            return "Login successfully";
          } else {
            throw new Error(response.error || "Invalid email or password!");
          }
        } catch (error) {
          setLoading(false);
          throw error.message || "An unknown error occurred!";
        }
      },
      {
        loading: "Trying to login...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex mobile:flex mobile:flex-col  items-center justify-center bg-[#e5f2f8] min-h-screen mobile:p-0 p-4">
      <div className="grid max-w-4xl w-full mobile:w-full mobile:h-[250px] grid-cols-2 mobile:grid mobile:grid-cols-1 gap-4 bg-white  rounded-lg shadow-md mobile:shadow-none mobile:bg-transparent pl-16 mobile:pl-[110px] pr-[123px] pt-[58px] pb-[52px]">
        <div className="flex  flex-col items-center justify-center mb-[40px] ">
          <Image
            alt="Image"
            className="w-[300px] h-[110px] mobile:w-[197px] mobile:h-[76px]  rounded-lg overflow-hidden object-cover object-center"
            height="120"
            src="/loginpage/logo.png"
            width="300"
          />
          <div className="w-[206px] h-[88px] mobile:w-[107px] mobile:h-[52px]">
            <h1 className="font-bold text-[48px] mobile:text-3xl"></h1>
            <h2 className="font-semibold text-2xl  mobile:text-lg text-opacity-65 text-gray-500 mobile:tracking-[4px] tracking-[9px] ">
              Dashboard
            </h2>
          </div>
        </div>

        <div className="flex mobile:hidden  flex-col justify-between gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Log in</h2>
            <Link
              className="text-sm font-medium text-[#0FBC43] 100% dark:hover:text-gray-50"
              href="/register"
            >
              Register
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="loginType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login As</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-[#F5F5F5] w-full">
                        <option value="user">Admin</option>
                        <option value="product">Client</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        type="email"
                        required
                        className="bg-[#F5F5F5]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="bg-[#F5F5F5]"
                        />
                      </FormControl>
                      <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <EyeIcon className="h-6 w-6 " />
                        ) : (
                          <EyeOff className="h-6 w-6 " />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center mb-4">
                <Link
                  className="text-sm font-medium text-black-500 100% dark:hover:text-gray-50"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              {!loading ? (
                <Button
                  type="submit"
                  className="text-white bg-red-400  w-full "
                >
                  Login
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
      <div className="flex sm:hidden mobile:p-4  mobile:w-[100%]  bg-white rounded-3xl shadow-[#7B7B7B40]  flex-col justify-between gap-4">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold">Log in</h2>
          <Link
            className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
            href="/register"
          >
            Register
          </Link>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-6"
          >
            <FormField
              control={form.control}
              name="loginType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login As</FormLabel>
                  <FormControl>
                    <select {...field} className="bg-[#F5F5F5] w-full">
                      <option value="user">User</option>
                      <option value="product">Product</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-[#F5F5F5]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex  gap-2 ">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="bg-[#F5F5F5]"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className=""
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-6 w-6 " />
                      ) : (
                        <EyeOff className="h-6 w-6 " />
                      )}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center mb-4">
              <Link
                className="text-sm font-medium text-black-500 100% dark:hover:text-gray-50"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            {!loading ? (
              <Button type="submit" className="text-white bg-red-400 w-full ">
                Login
              </Button>
            ) : (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
          </form>
          {/* <div className="flex flex-col gap-1 items-center justify-between mb-4">
            <span className="text-sm font-medium text-black-500">or</span>

            <button className="px-4 py-2 w-[234px] h-[60px]">
              <img
                className=" "
                src="https://www.opscow.com/html/resource/img/btn_login_google.png"
                loading="lazy"
                alt="google logo"
              />
            </button>
          </div> */}
        </Form>
      </div>
    </div>
  );
}
