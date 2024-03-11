'use client';
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className='w-full h-20 bg-emerald-800'>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full overflow:hidden'>
          <Link href='/' className='md:flex gap-x-6 text-white'>Jedi Software</Link>
            <ul className='md:flex gap-x-6 text-white flex justify-between items-center h-full float-right'>

            {isOpen ? (
              <>
                <li>
                  <Link href='/'>
                    <p>Home</p>
                  </Link>
                </li>
                <li>
                  <Link href='/find-the-cheese'>
                    <p>Find the Cheese</p>
                  </Link>
                </li>
              </>
            ) : null}
              <button
                onClick={() => setIsOpen(!isOpen)}
                data-collapse-toggle='navbar-hamburger'
                type='button'
                class='inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                aria-controls='navbar-hamburger'
                aria-expanded='false'
              >
                <span class='sr-only'>Open main menu</span>
                <svg
                  class='w-5 h-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 14'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 1h15M1 7h15M1 13h15'
                  />
                </svg>
              </button>
              

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

/*

<div class='flex items-center justify-between px-4 py-3 w-full h-20 bg-emerald-800'>
        <div>
          <p>Jedi Software</p>
        </div>
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            class='block text-gray-500 hover:text-white focus:text-white focus:outline-none'
          >
            <svg class='h-6 w-6 fill-current' viewBox='0 0 24 24'>
              <path
                v-if='isOpen'
                fill-rule='evenodd'
                d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
              />
              <path
                v-if='!isOpen'
                fill-rule='evenodd'
                d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
              />
            </svg>
          </button>
        </div>
      </div>
      <div class={isOpen ? 'block' : 'hidden'}>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <div className='flex justify-between items-center h-20 bg-emerald-800'>
              <ul className='hidden md:flex gap-x-6 text-white'>
                <li>
                  <Link href='/'>
                    <p>Home</p>
                  </Link>
                </li>
                <li>
                  <Link href='/find-the-cheese'>
                    <p>Find the Cheese</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
*/
