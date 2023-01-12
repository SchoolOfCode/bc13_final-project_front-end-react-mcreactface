import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import React, { useEffect, useState } from 'react'


export default function AvatarIcon({ size, avatarUrl }){
    const supabase = useSupabaseClient()
    const user = useUser()
    const imageUrl = supabase.storage.from('avatars').getPublicUrl(avatarUrl)
    console.log(imageUrl)
    return <div>
    
    {avatarUrl ? (
      <img
        src={imageUrl.data.publicUrl}
        alt="Avatar"
        className="avatar image"
        style={{ height: size, width: size }}
      />
      ) : (
      <div className="avatar no-image" style={{ height: size, width: size }} />
    )}
</div>
}

// import Image from 'next/image'

// export const MyImage = ({ avatar_url }) => {
//   return <Image src={`bucket/${avatar_url}`} alt="Picture of the author" width={500} height={500} />
// }


