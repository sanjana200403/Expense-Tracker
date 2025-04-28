import React, { useState } from 'react';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi'; 
import SideMenu from './SideMenu';

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSidemenu] = useState(false);

  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 back-drop-[12px] py-4 px-7 sticky top-0 z-10'>
      <button
        className='block lg:hidden text-black'
        onClick={() => {
          setOpenSidemenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h1 className='text-lg font-semibold text-black'>Expense Tracker</h1>
      {
        openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu}/>
                </div>
        )
      }
    </div>
  );
}

export default Navbar;
