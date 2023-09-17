import React from 'react'
import { Link } from 'react-router-dom'

const Notfound: React.FC = () => {
	return (
		<section
			className='flex items-center h-screen p-16 bg-gray-900 text-gray-100'
			style={{
				backgroundImage: "url('/assets/404-bg.jpg')",
				backgroundRepeat: 'repeat',
				backgroundSize: "contain"
			}}
		>
			<div className='bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center mx-auto p-8'>
				<div className='max-w-sm text-center flex flex-col space-y-4'>
					<p className='text-4xl font-semibold text-gray-700'>Üzgünüz, aradığın sayfayı bulamadık</p>
					<p className='text-gray-400 text-xs'>
						Eğer bu sayfanın var olduğuna eminsen, lütfen bir yetkiliye danışın.
					</p>
					<Link
						rel='noopener noreferrer'
						to='/'
						role={"button"}
						type={"button"}
						className='px-8 block py-1.5 font-semibold rounded bg-violet-400 text-white'
					>
						Anasayfa&apos;ya Dön
					</Link>
				</div>
			</div>
		</section>
	)
}
export default Notfound
