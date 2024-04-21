"use client";

import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps
 {
    _id:string;
    title:string;
    created_on:string;
    preview:string;
    del:Function;
}


const SideBarItem: React.FC<SideBarItemProps>=({
    _id,
    title,
    created_on,
    preview,
    del,
})=>{
    const pathname= usePathname();
    
    return(
        <Link
            href={`/notes/[id]`} as={`/notes/${_id}`}>
            <div className={twMerge("flex flex-col border-b-2 p-2 text-sm opacity-40 border-[#C6B0BC] ",pathname===`/notes/${_id}` && "opacity-100")}>
                <div className="flex flex-row justify-between">
                    <div>{title}</div>
                    <Link href={'/note'} ><MdDeleteOutline className="hover:opacity-50" onClick={()=>del(_id)} size={17}/></Link>   
                </div>
                <div>
                    {created_on}
                </div>
                <div>
                    {preview}
                </div>
            </div>
        </Link>
    );
};

export default SideBarItem