import React from 'react';
import { Toolbar, ToolbarButton, Icon, Page, ActionSheet, ActionSheetButton, Fab, BackButton } from 'react-onsenui';

import NavigatorHelper from '../../js/NavigatorHelper';
import { SaldoAnualContext, saldoAnualReducer, saldoAnualInitialProps, LIST_MODE } from './SaldoAnualReducer';
import RecebimentoLista from './recebimento/RecebimentoLista';
import DespesaLista from './despesa/DespesaLista';
import RecebimentoFormulario from './recebimento/RecebimentoFormulario';
import DespesaFormulario from './despesa/DespesaFormulario';

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
	const [state, dispatch] = React.useReducer( saldoAnualReducer, saldoAnualInitialProps );

	/**
	|--------------------------------------------------
	| Attributes
	|--------------------------------------------------
	*/
	const isDeleteMode = state.isDeleteMode || false;
	const [showActionSheet, setShowActionSheet] = React.useState( false );
	
	//conta quantos recebimentos estão selecionados
	const recebimentoSelectCount = state.recebimentoDataSource.reduce( ( count, recebimento ) => recebimento.checked ? ++count : count, 0 );

	//conta quantas despesas estão selecionadas
	const despesaSelectCount = state.despesaDataSource.reduce( ( count, despesa ) => despesa.checked ? ++count : count, 0 );

	/**
	|--------------------------------------------------
	| Functions
	|--------------------------------------------------
	*/

	function openRecebimento() {
		setShowActionSheet( false );

		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<RecebimentoFormulario />
			</SaldoAnualContext.Provider>
		);
	}

	function openDespesa() {
		setShowActionSheet( false );
		
		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<DespesaFormulario />
			</SaldoAnualContext.Provider>
		);
	}

	function onLongPress() {
		setIsDeleteMode( true );
	}

	function onDeleteBatch() {
		//dispatch( { type: MAIN_STATE, payload: { teste: 'hihihi' } } );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
    const toolbar = (
		<Toolbar>
			<div className="left">
				{ isDeleteMode ? <ToolbarButton onClick={ () => dispatch( { type: LIST_MODE } ) }><Icon icon="ion-arrow-back, material:md-arrow-left" /></ToolbarButton> : null }
				{ !isDeleteMode ? <ToolbarButton><Icon icon="ion-navicon, material:md-menu" /></ToolbarButton> : null }
			</div>
        	<div className="center">{ isDeleteMode ? recebimentoSelectCount + despesaSelectCount : state.month.format( 'MMMM' ).toUpperCase() + ' | ' + state.month.format( 'YYYY ') }</div>
			<div className="right">
				{ isDeleteMode ? <ToolbarButton onClick={ () => onDeleteBatch() }><Icon icon="ion-trash, material:md-delete" /></ToolbarButton> : null }
			</div>
      </Toolbar>
	);
    
    return (
        <Page renderToolbar={ () => toolbar }>
			<div style={{ marginTop: '20px' }}>
				<div style={{ textAlign: 'center', fontSize: '13px', opacity: '0.56' }}>Saldo previsto para o mês</div>
				<div style={{ textAlign: 'center', fontSize: '22px', margin: '4px 0' }}>R$ 300,00</div>
			</div>

			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<RecebimentoLista />
				<DespesaLista />
			</SaldoAnualContext.Provider>

			<Fab position="bottom right" onClick={ () => setShowActionSheet( true ) }><Icon icon='fa-plus' /></Fab>

			<ActionSheet isOpen={ showActionSheet } onCancel={ () => setShowActionSheet( false ) } title="Adicionar">
				<ActionSheetButton icon="" onClick={ () => openRecebimento() }>Novo recebimento</ActionSheetButton>
				<ActionSheetButton icon="" onClick={ () => openDespesa() }>Nova despesa</ActionSheetButton>
			</ActionSheet>
        </Page>
    );
}