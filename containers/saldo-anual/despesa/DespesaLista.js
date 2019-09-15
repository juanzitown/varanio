import React from 'react';
import { List, ListTitle, ListItem, Switch, Checkbox, Button } from 'react-onsenui';

import NavigatorHelper from '../../../js/NavigatorHelper';
import { SaldoAnualContext, RERENDER, DELETE_MODE } from '../SaldoAnualReducer';
import LongPressEvent from '../../../components/LongPressEvent';
import DespesaFormulario from './DespesaFormulario';

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
	const dataSource = state.despesaDataSource || [];
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

	function onLongPress() {
		dispatch( { type: DELETE_MODE } );
	}

	function openDespesaFormulario( despesa ) {
		NavigatorHelper.pushPage( <DespesaFormulario despesa={ despesa } /> );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/

	const rowRenderer = ( despesa, index ) => (
		<ListItem key={ index } tappable modifier={ isDeleteMode ? '' : 'chevron' }>
			<div className="left" style={{ height: '48px' }}>
				{ isDeleteMode ? <Checkbox checked={ despesa.checked } onChange={ () => { despesa.checked = !despesa.checked; dispatch( { type: RERENDER } ); } } /> : null }
				{ !isDeleteMode ? <Switch checked={ despesa.pago } onChange={ () => { despesa.pago = !despesa.pago; dispatch( { type: RERENDER } ); } } /> : null }
			</div>
			<div className="center" onClick={ () => isDeleteMode ? null : openDespesaFormulario( despesa ) } { ...onLongPressEvent } onTouchEnd={ () => { despesa.checked = !despesa.checked; dispatch( { type: RERENDER } ); } }>
				<div className="flex">{despesa.nome}</div>
				<div style={{ marginRight: '38px' }}>{despesa.valor}</div>
			</div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>DESPESAS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
			{ !dataSource.length ? <div style={{ margin: '0 12px' }}><Button modifier="large--quiet" style={{ padding: '10px', color: '#f44336', border: '2px dashed currentColor', borderRadius: '28px' }}>ADICIONAR DESPESA</Button></div> : null }
		</div>
    );
}