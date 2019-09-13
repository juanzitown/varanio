import React from 'react';
import { Toolbar, ToolbarButton, Icon, Page, ActionSheet, ActionSheetButton, Fab } from 'react-onsenui';

import NavigatorHelper from '../../helpers/NavigatorHelper';
import RecebimentoLista from './RecebimentoLista';
import DespesaLista from './DespesaLista';
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
	const navigator = props.navigator;
	const [showActionSheet, setShowActionSheet] = React.useState( false );

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

	function openRecebimento() {
		setShowActionSheet( false );
		NavigatorHelper.pushPage( <RecebimentoFormulario /> );
	}

	function openDespesa() {
		setShowActionSheet( false );
		NavigatorHelper.pushPage( <RecebimentoFormulario /> );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
    const toolbar = (
		<Toolbar>
			<div className='left'>
				<ToolbarButton><Icon icon='ion-navicon, material:md-menu' /></ToolbarButton>
			</div>
        	<div className='center'>SETEMBRO / 2019</div>
      </Toolbar>
	);
    
    return (
        <Page renderToolbar={ () => toolbar }>
			<RecebimentoLista navigator={ navigator } />
			<DespesaLista navigator={ navigator } />

			<div>
				<div className='left'>Saldo: </div>
				<div className='center'>R$ 1000</div>
			</div>

			<Fab position="bottom right" onClick={ () => setShowActionSheet( true ) }><Icon icon='fa-plus' /></Fab>

			<ActionSheet isOpen={ showActionSheet } onCancel={ () => setShowActionSheet( false ) } title="Adicionar">
				<ActionSheetButton icon="" onClick={ () => openRecebimento() }>Novo recebimento</ActionSheetButton>
				<ActionSheetButton icon="" onClick={ () => openDespesa() }>Nova despesa</ActionSheetButton>
			</ActionSheet>
        </Page>
    );
}