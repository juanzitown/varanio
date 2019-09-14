import React from 'react';
import moment from 'moment/min/moment-with-locales';
import { Toolbar, ToolbarButton, Icon, Page, ActionSheet, ActionSheetButton, Fab, BackButton } from 'react-onsenui';

import NavigatorHelper from '../../js/NavigatorHelper';
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
	console.log( state );

	/**
	|--------------------------------------------------
	| Attributes
	|--------------------------------------------------
	*/
	const [isDeleteMode, setIsDeleteMode] = React.useState( false );
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
		NavigatorHelper.pushPage( <RecebimentoFormulario /> );
	}

	function openDespesa() {
		setShowActionSheet( false );
		NavigatorHelper.pushPage( <DespesaFormulario /> );
	}

	function onLongPress() {
		setIsDeleteMode( true );
	}

	function onDeleteBatch() {
		dispatch( { type: MAIN_STATE, payload: { teste: 'hihihi' } } );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
    const toolbar = (
		<Toolbar>
			<div className="left">
				{ isDeleteMode ? <ToolbarButton onClick={ () => setIsDeleteMode( false ) }><Icon icon="ion-arrow-back, material:md-arrow-left" /></ToolbarButton> : null }
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

			<RecebimentoLista isDeleteMode={ isDeleteMode } onLongPress={ () => onLongPress() } />
			<DespesaLista isDeleteMode={ isDeleteMode } onLongPress={ () => onLongPress() } />

			<Fab position="bottom right" onClick={ () => setShowActionSheet( true ) }><Icon icon='fa-plus' /></Fab>

			<ActionSheet isOpen={ showActionSheet } onCancel={ () => setShowActionSheet( false ) } title="Adicionar">
				<ActionSheetButton icon="" onClick={ () => openRecebimento() }>Novo recebimento</ActionSheetButton>
				<ActionSheetButton icon="" onClick={ () => openDespesa() }>Nova despesa</ActionSheetButton>
			</ActionSheet>
        </Page>
    );
}

/**
 * 
 */
const MAIN_STATE = 'MAIN_STATE';


/**
 * 
 */
moment.locale( 'pt-BR' );
const saldoAnualInitialProps = {
    recebimentoDataSource: [],
    despesaDataSource: [],
	isDeleteMode: false,
	month: moment(),
}

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
const saldoAnualReducer = ( state = saldoAnualMainState, action ) => {
    switch ( action.type ) {
        case MAIN_STATE:
            return state = {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};