import React from 'react';
import { Page, Switch } from 'react-onsenui';
import { List, ListHeader, ListItem } from 'react-onsenui';

export default ( props = {} ) => {

	const rowRenderer = ( row, index ) => (
		<ListItem key={ index }>
			<div className='left'>{row.nome}</div>
			<div>{row.valor}</div>
		</ListItem>
	);
    
    return (
        <List
			dataSource={ [{ nome: 'High Sales', valor: 2600 }] }
			renderRow={ rowRenderer }
			renderHeader={ () => <ListHeader>RECEBIMENTOS</ListHeader> } />
    );
}