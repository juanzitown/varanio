import React from 'react';
import { Page, Switch } from 'react-onsenui';
import { List, ListHeader, ListItem } from 'react-onsenui';

export default ( props = {} ) => {

	const rowRenderer = ( row, index ) => (
		<ListItem key={ index }>
			<div className='left'>{row.nome}</div>
			<div>{row.valor}</div>
			<div className='right'><Switch checked={ row.pago } onChange={ () => {} } /></div>
		</ListItem>
	);
    
    return (
        <List
			dataSource={ [{ nome: 'NET Claro TV', valor: 210 }] }
			renderRow={ rowRenderer }
			renderHeader={ () => <ListHeader>DESPESAS</ListHeader> } />
    );
}