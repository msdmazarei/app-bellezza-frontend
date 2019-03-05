import * as React from 'react';
import { Provider } from 'react-redux'
import { Store } from '../redux/store'

import { AppRouter } from './app_router';
export class App extends React.Component<any, any>{


    render() {
        return (
            <Provider store={Store}>
                <AppRouter></AppRouter>
            </Provider>

        );
    }
}
