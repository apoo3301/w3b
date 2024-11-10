'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '~/components/navbar'

export default function Component() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
    </div>
  )
}