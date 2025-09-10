import PixelBlast from '@/components/PixelBlast'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { Spotlight } from '@/components/ui/spotlight-new'
import { isAuthenticated } from '@/lib/auth.action'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({children} : {children: React.ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated()

  if(isUserAuthenticated) redirect('/')
  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-transparent via-black to-blue-950 p-2 flex flex-col justify-center items-center relative overflow-hidden'>
         <BackgroundRippleEffect cols={54} rows={64} cellSize={112} />
         <Spotlight/>
           
      {children}
    </div>
  )
}

export default layout
