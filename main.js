import React from 'react';
import ReactDOM from 'react-dom';
import NavigatorHelper from './js/NavigatorHelper';

import { Page } from 'react-onsenui';
import { Splitter, SplitterContent, SplitterSide, Navigator } from 'react-onsenui';
import SaldoAnual from './containers/saldo-anual/SaldoAnual';
import { saldoAnualReducer, saldoAnualInitialProps } from './containers/saldo-anual/SaldoAnualReducer';

function App( props = {} ) {

	const [state, dispatch] = React.useReducer( saldoAnualReducer, saldoAnualInitialProps );
	const [showMenu, setShowMenu] = React.useState( false );

	const splitterSide = (
		<SplitterSide 
			side='left'
			style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}
			width={ 200 }
			collapse={ true }
			swipeable={ true }
			isOpen={ showMenu }
			onClose={ () => setShowMenu( false ) }
			onOpen={ () => setShowMenu( true ) }>

			<Page>
				Isso vai aparecer no menu lateral
			</Page>
        </SplitterSide>
	);

	return (
		<Splitter>
			{ splitterSide }
			
			<SplitterContent>
				<Navigator renderPage={ NavigatorHelper.renderer } initialRoute={ <SaldoAnual /> } />
			</SplitterContent>
		</Splitter>
	);
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );