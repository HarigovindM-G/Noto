import {  Dela_Gothic_One} from "next/font/google";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center font-" >
      <div className="-translate-y-12 -translate-x-6  justify-center ">
        <div className="flex justify-center">
          <h1 className="Jap">ノート</h1>
        </div>
        <div className="flex justify-center -translate-y-10">
          <h2 className="Jap_trans ">Nōto</h2>
        </div>
        <div className="flex justify-center -translate-y-8 text-[#C6B0BC]">
          <h2 className="text-2xl opacity-70">A Simple and Sleek Note App</h2>
        </div>
        <Link href={"/login"}>
        <div className="flex justify-center">
        <div className="flex justify-center bg-[#C6B0BC] p-5 w-80 rounded-xl">
            <button className="text-white text-2xl font-bold">Log in</button>
        </div>
        </div>
       </Link>
       <div className="mt-3 flex justify-center text-[#C6B0BC] text-base">
          <p>Dont have an account? <span className="text-[#7C2629] hover:text-[#F3CFB3]"><Link href={"/signup"}> Sign Up</Link></span></p>
       </div>
      </div>
    </div>
  );
}

