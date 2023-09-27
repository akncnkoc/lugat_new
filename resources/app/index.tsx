import ReactDOM from 'react-dom/client'
import App from './App'
import '@/styles/index.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import { Toaster } from 'react-hot-toast'
import './i18n'
import { ModalContainer } from '@/components/modal/ModalContainer'
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<Provider store={store}>
		<ModalContainer />
		<Toaster containerStyle={{ zIndex: 99999999 }} />
		<App />
	</Provider>,
)
