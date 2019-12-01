import React from 'react';
import { toMoney } from '../../../js/Util';
import * as db from '../../../js/DatabaseHelper';
import moment from 'moment/min/moment-with-locales';
import NavigatorHelper from '../../../js/NavigatorHelper';
import LongPressEvent from '../../../components/LongPressEvent';
import { SaldoAnualContext, CHANGE_MONTH, RERENDER } from '../SaldoAnualReducer';

import { List, ListTitle, ListItem, Switch, Toolbar, Page, BackButton } from 'react-onsenui';

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
	const [dataSource, setdataSource] = React.useState( [] );

	//event
	const onLongPressEvent = LongPressEvent( onLongPress, 800 );

	/**
	|--------------------------------------------------
	| Effects
	|--------------------------------------------------
	*/
	React.useEffect( () => {
		const duplicatedMonths = Object.keys( localStorage ).filter( key => key.startsWith( 'recebimento' ) || key.startsWith( 'despesa' ) ).map( key => key.substring( key.length - 6, key.length ) );
		const safeMonths = [ ...new Set( duplicatedMonths ) ];
		
		const data = safeMonths.map( key => {	
			var recebimentoDataSource = db.list( 'recebimento' + key );
			var despesaDataSource = db.list( 'despesa' + key );
			var totalRecebimento = recebimentoDataSource.reduce( ( sum, recebimento ) => recebimento.valor + sum, 0 );
			var totalDespesa = despesaDataSource.reduce( ( sum, despesa ) => despesa.pago ? despesa.valor + sum : sum, 0 );
			var month = moment( '01' + key, 'DDMMYYYY', true );

			return {
				month: month,
				nome: month.format( 'MMMM [de] YYYY' ),
				totalDespesa: totalDespesa,
				totalRecebimento: totalRecebimento,
				restante: totalRecebimento - totalDespesa,
			};
		});

		
		setdataSource( data );
	}, [] );

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

	/**
	 * 
	 */
	function onLongPress() {
		//	dispatch( { type: DELETE_MODE } );
	}

	/**
	 * 
	 */
	function onClick( mes ) {
		dispatch( { type: CHANGE_MONTH, payload: { month: mes.month } } );
		NavigatorHelper.popPage();
	}
	
	/**
	 * 
	 */
	/*function openRecebimentoFormulario( recebimento ) {
		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<RecebimentoFormulario recebimento={ recebimento } />
			</SaldoAnualContext.Provider>
		);
	}*/

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
	const rowRenderer = ( mes, index ) => (
		<ListItem key={ index } tappable modifier="chevron">
			<div className="left" style={{ height: '48px' }}>
				<Switch checked={ mes.checked } onChange={ () => { mes.checked = !mes.checked; dispatch( { type: RERENDER } ); } } />
			</div>
			<div className="center" onClick={ () => onClick( mes ) } { ...onLongPressEvent } onTouchEnd={ () => { mes.checked = !mes.checked; dispatch( { type: RERENDER } ); } }>
				<div className="flex">{ mes.nome }</div>
				<div style={{ marginRight: '38px' }}>{ toMoney( mes.restante ) }</div>
			</div>
		</ListItem>
	);
	
	const toolbar = (
		<Toolbar>
			<div className="left"><BackButton>Back</BackButton></div>
			<div className="center">Histórico</div>
		</Toolbar>
	);
    
	return(
		<Page renderToolbar={ () => toolbar }>
			<ListTitle>SALDOS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
		</Page>
    );
}