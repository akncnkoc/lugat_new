import LoaderComponent from '@/components/anims/LoaderComponent'
import { ModalContainer } from '@/components/modal/ModalContainer'
import { persistor, store } from '@/store'
import '@/styles/index.scss'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import i18next from './config/i18n'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={<LoaderComponent />} persistor={persistor}>
      <I18nextProvider i18n={i18next}>
        <ModalContainer />
        <Toaster containerStyle={{ zIndex: 99999999 }} />
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
)
