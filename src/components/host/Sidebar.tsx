import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaList } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import SvgComponent from '@/components/list-your-property/SvgComponent'

interface SidebarProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const getItemClass = (path: string) => {
    const baseClass = "flex items-center px-4 py-3 text-gray-700 transition-colors duration-200"
    return pathname === path
      ? `${baseClass} bg-pink-500 text-white`
      : `${baseClass} hover:bg-gray-200 hover:bg-opacity-30`
  }

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} md:ml-0 md:w-64 fixed h-full z-30`}>
      <div className="flex items-center justify-between p-3 bg-zinc-100">
        <div><SvgComponent /></div>
        {isSmallScreen && (
          <button onClick={toggleSidebar} className="text-gray-700">
            <IoIosArrowBack size={24} />
          </button>
        )}
      </div>
      <nav className="mt-6">
        <Link href="/host-dashboard" className={getItemClass('/host-dashboard')}>
          <FaHome className="mr-3" />
          Dashboard
        </Link>
        <Link href="/host-listings" className={getItemClass('/host-listings')}>
          <FaList className="mr-3" />
          My listings
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar