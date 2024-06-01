import { Avatar } from '@mui/material'
import { useState } from 'react'
export default function AvatarComponent (props) {
  const { setBuffer, avatarCarga = null } = props

  const [avatar, setAvatar] = useState(null)

  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]))
    setBuffer(event.target.files[0])
  }
  return (
    <div className='flex flex-col items-center'>
      <Avatar alt='Avatar' src={avatar === null ? avatarCarga : avatar} sx={{ width: 150, height: 150 }} />
      <input id='avatar-input' type='file' accept='image/*' onChange={handleAvatarChange} className='hidden' />
      <label htmlFor='avatar-input' className='mt-3 mb-4  mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white '>
        Subir Imagen
      </label>
    </div>
  )
}
