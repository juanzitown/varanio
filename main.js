import React from 'react';
import ReactDOM from 'react-dom';

import { Page } from 'react-onsenui';
import { Splitter, SplitterContent, SplitterSide } from 'react-onsenui';

import SaldoAnual from './containers/saldo-anual/SaldoAnual';

function App( props = {} ) {
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
				<SaldoAnual />
			</SplitterContent>
		</Splitter>
	);
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );