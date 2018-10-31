import * as React from 'react'
import * as m from 'react-materialize'
import * as KeyboardEventHandler from 'react-keyboard-event-handler'
import SecretExplorer from './explorer/SecretExplorer'
import ActionNavigation from './content/ActionNavigation'
import SecretDetails from './content/SecretDetails'
import './MainApplication.css'

export interface SecretState {
    secretName: string
    secretValue: string
}
interface MainApplicationState extends SecretState {
    searchValue: string
}

export default class MainApplication extends React.Component<any, MainApplicationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            secretName: '',
            secretValue: '',
            searchValue: ''
        }
    }

    render() {
        const { secretValue, secretName, searchValue } = this.state

        return (
            <div className='wrapper'>
                <div className='secret-explorer'>
                    <KeyboardEventHandler handleKeys={ [ 'esc' ] } handleFocusableElements onKeyEvent={ this.onCancelSearch } />
                    <m.Input className='search-bar' value={searchValue} placeholder='Search...' onChange={this.onSearchChange} />
                    <SecretExplorer searchValue={searchValue} onSecretClick={this.onSecretClick} />
                </div>

                <div className='main-content'>
                    <m.Row>
                        <m.Col s={12}>
                            <ActionNavigation secretName={secretName} secretValue={secretValue} />
                            <SecretDetails secretName={secretName} secretValue={secretValue} />
                        </m.Col>
                    </m.Row>
                </div>
            </div>
        )
    }

    private onSearchChange = (event: any, searchValue: string) => {
        this.setState({ ...this.state, searchValue })
    }

    private onCancelSearch = (event: any, searchValue: string) => {
        this.onSearchChange(event, '')
    }

    private onSecretClick = (secretName: string, secretValue: string) => {
        this.setState({ ...this.state, secretName, secretValue })
    }
}
