import React from 'react';
import { Toolbar, ToolbarButton, Icon, Page } from 'react-onsenui';

import RecebimentoLista from './RecebimentoLista';
import DespesaLista from './DespesaLista';

export default ( props = {} ) => {

    const toolbar = (
		<Toolbar>
			<div className='left'>
				<ToolbarButton>
					<Icon icon='ion-navicon, material:md-menu' />
				</ToolbarButton>
			</div>
        	<div className='center'>SETEMBRO / 2019</div>
      </Toolbar>
	);
    
    return (
        <Page renderToolbar={ () => toolbar }>
			<RecebimentoLista />
			<DespesaLista />

			<div>
				<div className='left'>Saldo: </div>
				<div className='center'>R$ 1000</div>
			</div>
        </Page>
    );
}