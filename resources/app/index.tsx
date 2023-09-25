import ReactDOM from 'react-dom/client'
import App from './App'
import '@/styles/index.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import { Toaster } from 'react-hot-toast'
import './i18n'
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<Provider store={store}>
		<Toaster containerStyle={{ zIndex: 99999999 }} />
		<App />
	</Provider>,
)
