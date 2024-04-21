import LoginComp from "@/components/LoginComp";
import SignupComp from "@/components/SignupComp";
export default function signup(){
    return(

        <div className="bg-[#C6B0BC] max-h-screen min-h-screen flex flex-col justify-center items-center relative ">
            <div className="Jap2 mb-4 text-5xl text-white">
            
            </div>
            <div className="w-8/12 md:w-4/12">
                <SignupComp/>
            </div>
        </div>
    );
}