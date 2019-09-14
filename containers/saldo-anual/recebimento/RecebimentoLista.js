import React from 'react';
import { List, ListTitle, ListItem, Checkbox } from 'react-onsenui';

import NavigatorHelper from '../../../js/NavigatorHelper';
import LongPressEvent from '../../../components/LongPressEvent';
import RecebimentoFormulario from './RecebimentoFormulario';

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
	const [dataSource, setDataSource] = React.useState( props.dataSource || [ { nome: 'High Sales', valor: 2600 }, { nome: 'oitos lixo', valor: 1000 } ] );
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
		dataSource.map( recebimento => recebimento.checked = false );
		setIsDeleteMode( props.isDeleteMode );
	}, [props.isDeleteMode]);

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/
	
	function openRecebimentoFormulario( recebimento ) {
		NavigatorHelper.pushPage( <RecebimentoFormulario recebimento={ recebimento } /> );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
	const rowRenderer = ( recebimento, index ) => (
		<ListItem key={ index } tappable modifier={ isDeleteMode ? '' : 'chevron' }>
			<div className="left" style={{ height: '48px' }}>
				{ isDeleteMode ? <Checkbox checked={ recebimento.checked } onChange={ () => { recebimento.checked = !recebimento.checked; forceUpdate(); } } /> : null }
			</div>
			<div className="center" onClick={ () => isDeleteMode ? null : openRecebimentoFormulario( recebimento ) } { ...onLongPressEvent } onTouchEnd={ () => { recebimento.checked = true; forceUpdate(); } }>
				<div className="flex">{recebimento.nome}</div>
				<div style={{ marginRight: '38px' }}>{recebimento.valor}</div>
			</div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>RECEBIMENTOS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
		</div>
    );
}