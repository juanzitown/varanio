import React from 'react';
import { List, ListTitle, ListItem, Switch, Checkbox } from 'react-onsenui';

import NavigatorHelper from '../../../js/NavigatorHelper';
import LongPressEvent from '../../../components/LongPressEvent';
import DespesaFormulario from './DespesaFormulario';
import SaldoAnual from '../SaldoAnual';

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default ( props = {} ) => {

	/**
	|--------------------------------------------------
	| Attributes
	|--------------------------------------------------
	*/
	const [dataSource, setDataSource] = React.useState( [ { nome: 'Conta de Luz', valor: 410 }, { nome: 'NET Claro TV', valor: 210 }, { nome: 'Mercado', valor: 820 } ] );
	const onLongPress = props.onLongPress || function(){};
	const onLongPressEvent = LongPressEvent( onLongPress, 800 );
	const [isDeleteMode, setIsDeleteMode] = React.useState( false );

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback( () => updateState( {} ), [] );

	/**
	|--------------------------------------------------
	| Effects
	|--------------------------------------------------
	*/
	React.useEffect( () => {
		dataSource.map( despesa => despesa.checked = false );
		setIsDeleteMode( props.isDeleteMode );
	}, [props.isDeleteMode]);

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

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
				{ isDeleteMode ? <Checkbox checked={ despesa.checked } onChange={ () => { despesa.checked = !despesa.checked; forceUpdate(); } } /> : null }
				{ !isDeleteMode ? <Switch checked={ despesa.pago } onChange={ () => { despesa.pago = !despesa.pago; forceUpdate(); } } /> : null }
			</div>
			<div className="center" onClick={ () => isDeleteMode ? null : openDespesaFormulario( despesa ) } { ...onLongPressEvent } onTouchEnd={ () => { despesa.checked = true; forceUpdate(); } }>
				<div className="flex">{despesa.nome}</div>
				<div style={{ marginRight: '38px' }}>{despesa.valor}</div>
			</div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>DESPESAS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
		</div>
    );
}