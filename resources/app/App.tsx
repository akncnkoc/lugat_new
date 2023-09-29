import router from './Router'
import ToastNotifications from '@/components/ToastNotifications'
import { RouterProvider } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

function App() {
	const appSlice = useAppSelector((state) => state.appSlice)
	return (
		<div className='relative flex-1 h-full flex flex-col'>
			{appSlice.isGlobalLoading && (
				<div className='c-header'>
					<div className='c-header-loader'>
						<div className='c-slidingLoader'>
							<div className='c-slidingLoader-inner'></div>
						</div>
					</div>
				</div>
			)}
			<RouterProvider router={router} />
			<ToastNotifications />
		</div>
	)
}

export default App
