import ReactDOM from 'react-dom/client'
import App from './App'
import '@/styles/index.scss'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store'
import { Toaster } from 'react-hot-toast'
import './i18n'
import { ModalContainer } from '@/components/modal/ModalContainer'
import LoaderComponent from '@/components/anims/LoaderComponent'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<Provider store={store}>
		<PersistGate loading={<LoaderComponent />} persistor={persistor}>
			<ModalContainer />
			<Toaster containerStyle={{ zIndex: 99999999 }} />
			<App />
		</PersistGate>
	</Provider>,
)
