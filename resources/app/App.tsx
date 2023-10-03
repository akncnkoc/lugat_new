import router from './Router'
import ToastNotifications from '@/components/ToastNotifications'
import { RouterProvider } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useMemo } from 'react'
import { storeDispatch } from '@/store'
import { setSidebarClassNames } from '@/store/slices/appSlice'

function App() {
	const windowSize = useWindowSize()
	const isMenuEnabled = useMemo(
		() => windowSize.width && windowSize.width < 1024,
		[windowSize.width],
	)

	useEffect(() => {
		if (isMenuEnabled) {
			storeDispatch(setSidebarClassNames('-translate-x-full absolute z-5000 h-full'))
		} else {
			storeDispatch(setSidebarClassNames(''))
		}
	}, [isMenuEnabled])
	return (
		<div className='relative flex-1 h-full flex flex-col'>
			<RouterProvider router={router} />
			<ToastNotifications />
		</div>
	)
}

export default App
