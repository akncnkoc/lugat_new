import router from './Router'
import ToastNotifications from '@/components/ToastNotifications'
import { RouterProvider } from 'react-router-dom'

function App() {
	return (
		<div className='relative flex-1 h-full flex flex-col'>
			<RouterProvider router={router} />
			<ToastNotifications />
		</div>
	)
}

export default App
