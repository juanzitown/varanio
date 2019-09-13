import React from 'react';
import { List, ListTitle, ListItem, Button, Switch } from 'react-onsenui';

import NavigatorHelper from '../../helpers/NavigatorHelper';
import RecebimentoFormulario from './recebimento/RecebimentoFormulario';

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
	const dataSource = props.dataSource || [ { nome: 'High Sales', valor: 2600 }, { nome: 'oitos lixo', valor: 1000 } ];

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
		<ListItem key={ index } tappable modifier="chevron">
			<div className="center">
				<div className="flex">{recebimento.nome}</div>
				<div style={{ marginRight: '8px' }}>{recebimento.valor}</div>
			</div>
			<div className="right" onClick={ () => openRecebimentoFormulario( recebimento ) }></div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>RECEBIMENTOS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
		</div>
    );
}