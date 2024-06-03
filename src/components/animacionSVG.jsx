const AnimacionSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 600 900'
      className='w-full h-full rounded-tl-lg rounded-bl-lg'
      preserveAspectRatio='none'
    >
      <g fill='none' mask='url("#SvgjsMask1009")'>
        <path fill='rgba(31, 41, 55, 1)' d='M0 0h600v900H0z' />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m-12.66 858.092 73.392 138.031 138.031-73.392-73.392-138.03zM517.293 873.687l37.157-174.814-174.813-37.157-37.158 174.813z'
          className='triangle-float1'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m83.275 312.074 52.032 93.867 93.866-52.031-52.03-93.867z'
          className='triangle-float3'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m184.531 671.277-81.24 43.197 43.196 81.24 81.24-43.196z'
          className='triangle-float2'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m8.95 556.325 141.852 19.936 19.936-141.852-141.852-19.936z'
          className='triangle-float1'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m499.504 322.632-103.462-67.189-67.189 103.462 103.462 67.19z'
          className='triangle-float3'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m464.877 541.789-106.756 54.395 54.395 106.756 106.756-54.395zM296.138 269.065l160.975 22.624 22.623-160.975-160.975-22.624z'
          className='triangle-float1'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m594.305-13.14-83.91 81.032 81.031 83.91 83.911-81.031z'
          className='triangle-float2'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m341.763 704.358 59.62 91.806 91.806-59.62-59.62-91.805z'
          className='triangle-float3'
        />
        <path
          fill='rgba(29, 83, 137, 0.4)'
          d='m199.37 203.846 142.42-35.51-35.509-142.42-142.42 35.51z'
          className='triangle-float2'
        />
      </g>
      <defs>
        <style>
          {
'@keyframes float1{0%,to{transform:translate(0,0)}50%{transform:translate(-10px,0)}}@keyframes float2{0%,to{transform:translate(0,0)}50%{transform:translate(-5px,-5px)}}@keyframes float3{0%,to{transform:translate(0,0)}50%{transform:translate(0,-10px)}}.triangle-float1{animation:float1 5s infinite}.triangle-float2{animation:float2 4s infinite}.triangle-float3{animation:float3 6s infinite}'
          }
        </style>
        <mask id='SvgjsMask1009'>
          <path fill='#fff' d='M0 0h600v900H0z' />
        </mask>
      </defs>
    </svg>
  )
}

export default AnimacionSvg
