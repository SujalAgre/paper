import SidebarIcon from '@/app/assets/icons/sidebar.svg'
import {Dispatch, SetStateAction } from 'react';

type Props = {
  setSidebar: Dispatch<SetStateAction<boolean>>;
};


const Sidebar = ({setSidebar}:Props) => {
    return (

        <div className="w-full h-full bg-[#f5f1ea] flex flex-col items-center">
            <div className='flex w-full' >
                <SidebarIcon fill="#4B352A" className="mt-3 w-7 ml-3 cursor-pointer" onClick={()=>{
                    setSidebar(false)
                }} />
            </div>
            <div className="w-[90%] h-[6%] mt-[5%] flex justify-center border-1 border-[#9c958b] items-center rounded-xl cursor-pointer bg-[#f0e5d5] hover:bg-[#e9decf]">
                Create a new paper
            </div>
        </div>
    )
}

export default Sidebar
