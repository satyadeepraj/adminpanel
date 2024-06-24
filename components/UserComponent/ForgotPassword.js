import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ForgotPassword() {
  return (
    <div className="flex mobile:flex mobile:flex-col items-center justify-center bg-[#e5f2f8] min-h-screen mobile:p-0 p-4">
      <div className="grid max-w-4xl w-full mobile:h-[0px]   grid-cols-2 mobile:grid mobile:grid-cols-1 gap-6 bg-white rounded-lg shadow-md mobile:shadow-none mobile:bg-transparent pl-16 mobile:pl-[110px] pr-[123px] pt-[58px] pb-[200px]">
        <div className="flex flex-col mobile:mt-[-80px] items-center justify-center ">
          <Image
            alt="Image"
            className="w-[270px] h-[128px] mobile:w-[197px] mobile:h-[76px] mt-[70px]  rounded-lg overflow-hidden object-cover object-center"
            height="150"
            src="/Group-1.png"
            width="300"
          />
          <div className="w-[181px] h-[88px] mobile:w-[107px] mobile:h-[52px]">
            <h1 className="font-bold text-5xl mobile:text-3xl"></h1>
            <h2 className="font-semibold text-2xl mobile:text-lg text-opacity-65 text-gray-500 mobile:tracking-[4px] tracking-[11px] ml-2">
              Manthan
            </h2>
          </div>
        </div>
        <div className="flex mobile:hidden flex-col justify-between ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <Link
              className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
              href="/register"
            >
              Log in
            </Link>
          </div>
          <form>
            <div className="mb-12">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email address
              </label>
              <Input
                className="bg-[#F5F5F5]"
                id="email"
                placeholder="Email address"
                type="email"
              />
            </div>
          
            
            <Button className="w-full   bg-[#0FBC43] mb-4" type="submit">
              <Link href={"/reset-password"}>
              Send OTP
              </Link>
            </Button>
           
          </form>
        </div>
      </div>
      <div className="flex sm:hidden mobile:p-4  mobile:w-[100%] bg-white rounded-t-3xl shadow-[#7B7B7B40] flex-col justify-between gap-24 ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <Link
              className="text-sm font-medium text-[#FA890B] 100% dark:hover:text-gray-50"
              href="/register"
            >
              Log in
            </Link>
          </div>
          <form>
            <div className="mb-12">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email address
              </label>
              <Input
                className="bg-[#F5F5F5]"
                id="email"
                placeholder="Email address"
                type="email"
              />
            </div>
          
            
            <Button className="w-full   bg-[#0FBC43] mb-4 mobile:mb-24" type="submit">
              Send OTP
            </Button>
           
          </form>
        </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
