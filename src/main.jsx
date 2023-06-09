import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import GlobalStyles from './components/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
    //<React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    //</React.StrictMode>
)
