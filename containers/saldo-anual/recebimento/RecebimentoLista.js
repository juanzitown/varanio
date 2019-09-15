import React from 'react';
import { toMoney } from '../../../js/Util';
import NavigatorHelper from '../../../js/NavigatorHelper';
import LongPressEvent from '../../../components/LongPressEvent';
import { SaldoAnualContext, RERENDER, DELETE_MODE } from '../SaldoAnualReducer';

import { List, ListTitle, ListItem, Checkbox, Button } from 'react-onsenui';

import RecebimentoFormulario from './RecebimentoFormulario';

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default ( props = {} ) => {

	/**
	|--------------------------------------------------
	| Reducers
	|--------------------------------------------------
	*/
	const [state, dispatch] = React.useContext( SaldoAnualContext );

	/**
	|--------------------------------------------------
	| Attributes
	|--------------------------------------------------
	*/
	const dataSource = state.recebimentoDataSource || [];
	const isDeleteMode = state.isDeleteMode || false;

	//event
	const onLongPressEvent = LongPressEvent( onLongPress, 800 );

	/**
	|--------------------------------------------------
	| Effects
	|--------------------------------------------------
	*/
	React.useEffect( () => {}, [] );

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

	/**
	 * 
	 */
	function onLongPress() {
		dispatch( { type: DELETE_MODE } );
	}
	
	/**
	 * 
	 */
	function openRecebimentoFormulario( recebimento ) {
		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<RecebimentoFormulario recebimento={ recebimento } />
			</SaldoAnualContext.Provider>
		);
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
	const rowRenderer = ( recebimento, index ) => (
		<ListItem key={ index } tappable modifier={ isDeleteMode ? '' : 'chevron' }>
			<div className="left" style={{ height: '48px' }}>
				{ isDeleteMode ? <Checkbox checked={ recebimento.checked } onChange={ () => { recebimento.checked = !recebimento.checked; dispatch( { type: RERENDER } ); } } /> : null }
			</div>
			<div className="center" onClick={ () => isDeleteMode ? null : openRecebimentoFormulario( recebimento ) } { ...onLongPressEvent } onTouchEnd={ () => { recebimento.checked = !recebimento.checked; dispatch( { type: RERENDER } ); } }>
				<div className="flex">{ recebimento.nome }</div>
				<div style={{ marginRight: '38px' }}>{ toMoney( recebimento.valor ) }</div>
			</div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>RECEBIMENTOS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
			{ !dataSource.length ? <div style={{ margin: '0 12px' }}><Button onClick={ () => openRecebimentoFormulario() } modifier="large--quiet" style={{ padding: '10px', color: '#4caf50', border: '2px dashed currentColor', borderRadius: '28px' }}>ADICIONAR RECEBIMENTO</Button></div> : null }
		</div>
    );
}