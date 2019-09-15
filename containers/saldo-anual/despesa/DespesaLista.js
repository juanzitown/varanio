import React from 'react';
import { toMoney } from '../../../js/Util';
import NavigatorHelper from '../../../js/NavigatorHelper';
import { SaldoAnualContext, RERENDER, DELETE_MODE } from '../SaldoAnualReducer';

import { List, ListTitle, ListItem, Switch, Checkbox, Button } from 'react-onsenui';

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
		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<DespesaFormulario despesa={ despesa } />
			</SaldoAnualContext.Provider>
		);
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
				<div className="flex" style={ despesa.nome ? {} : { fontSize: '13px', fontWeight: '300', fontStyle: 'italic', opacity: '0.56' } }>{ despesa.nome ? despesa.nome : 'Sem descrição' }</div>
				<div style={{ marginRight: '38px' }}>{ toMoney( despesa.valor ) }</div>
			</div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>DESPESAS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
			{ !dataSource.length ? <div style={{ margin: '0 12px' }}><Button modifier="large--quiet" onClick={ () => openDespesaFormulario() } style={{ padding: '10px', color: '#f44336', border: '2px dashed currentColor', borderRadius: '28px' }}>ADICIONAR DESPESA</Button></div> : null }
		</div>
    );
}