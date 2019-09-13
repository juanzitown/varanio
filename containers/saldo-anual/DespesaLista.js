import React from 'react';
import { List, ListTitle, ListItem, Switch } from 'react-onsenui';

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
	const dataSource = props.dataSource || [ { nome: 'Conta de Luz', valor: 410 }, { nome: 'NET Claro TV', valor: 210 }, { nome: 'Mercado', valor: 820 } ];

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/

	const rowRenderer = ( row, index ) => (
		<ListItem key={ index } tappable modifier="chevron">
			<div className="left">
				<Switch checked={ row.pago } onChange={ () => {} } />
			</div>
			<div className="center">
				<div className="flex">{row.nome}</div>
				<div style={{ marginRight: '8px' }}>{row.valor}</div>
			</div>
			<div className="right" onClick={ () => console.log( 'pushPage DespesaFormulario' ) }></div>
		</ListItem>
	);
    
    return (
		<div>
			<ListTitle>DESPESAS { '(' + dataSource.length + ')' }</ListTitle>
			<List dataSource={ dataSource } renderRow={ rowRenderer } />
		</div>
    );
}