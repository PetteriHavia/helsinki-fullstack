import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { MessageContextProvider } from './components/context/MessageContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </Provider>
)