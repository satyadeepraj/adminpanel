import ClientHeader from '@/components/clientComponents/ClientHeader'
import ClientProfile from '@/components/clientComponents/ClientProfile'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='bg-blue-400'>
      <ClientHeader/></div>
      <ClientProfile/>
    </div>
  )
}

export default page
