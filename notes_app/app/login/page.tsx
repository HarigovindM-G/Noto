import LoginComp from "@/components/LoginComp";
export default function Login(){
    return(

        <div className="bg-[#C6B0BC] h-screen flex flex-col justify-center items-center relative h-screen ">
            <div className="w-8/12 md:w-4/12">
                <LoginComp/>
            </div>
        </div>
    );
}