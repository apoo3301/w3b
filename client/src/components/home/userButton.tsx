'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { logout } from '~/actions/logout'

interface UserButtonProps {
    userName: string
    userImage?: string
    userEmail?: string
    scrolled: boolean
}

export default function UserBtn({ userName, userImage, userEmail, scrolled }: UserButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                className={`flex items-center space-x-3 bg-gradient-to-r from-gold to-amber-500 ${
                    scrolled ? 'text-gray-800' : 'text-white'
                } px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                onClick={toggleDropdown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    {userImage ? (
                        <img src={userImage} alt={userName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <User className="w-6 h-6 text-gold" />
                        </div>
                    )}
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
                <span className="font-semibold text-sm">{userName}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="py-2">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                                <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
                            </div>
                            <Link href="/client" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <User className="w-5 h-5 mr-3 text-gray-400" />
                                Your Profile
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                }}
                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                            >
                                <LogOut className="w-5 h-5 mr-3 text-red-500" />
                                Log out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}