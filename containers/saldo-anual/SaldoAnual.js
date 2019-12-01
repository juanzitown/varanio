import React from 'react';
import { toMoney } from '../../js/Util';
import * as db from '../../js/DatabaseHelper';
import moment from 'moment/min/moment-with-locales';
import NavigatorHelper from '../../js/NavigatorHelper';
import { SaldoAnualContext, saldoAnualReducer, saldoAnualInitialProps, LIST_MODE, DELETE_BATCH, CHANGE_MONTH } from './SaldoAnualReducer';

import { Toolbar, ToolbarButton, Icon, Page, ActionSheet, ActionSheetButton, Fab, Button } from 'react-onsenui';

import RecebimentoLista from './recebimento/RecebimentoLista';
import DespesaLista from './despesa/DespesaLista';
import RecebimentoFormulario from './recebimento/RecebimentoFormulario';
import DespesaFormulario from './despesa/DespesaFormulario';
import HistoricoSaldoLista from './historico/HistoricoSaldoLista';

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
	const isOldMonth = state.month.format( 'MMYYYY' ) !== moment().format( 'MMYYYY' );
	const isDeleteMode = state.isDeleteMode || false;
	const [showActionSheet, setShowActionSheet] = React.useState( false );
	
	//calcula recebimentos
	const recebimentoSelectCount = state.recebimentoDataSource.reduce( ( count, recebimento ) => recebimento.checked ? ++count : count, 0 );
	const recebimentoTotal = state.recebimentoDataSource.reduce( ( sum, recebimento ) => recebimento.valor + sum, 0 );
	
	//calcula despesas
	const despesaSelectCount = state.despesaDataSource.reduce( ( count, despesa ) => despesa.checked ? ++count : count, 0 );
	const despesaTotal = state.despesaDataSource.reduce( ( sum, despesa ) => despesa.pago ? despesa.valor + sum : sum, 0 );

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

	function onDeleteBatch() {
		const recebimentoIds = state.recebimentoDataSource.filter( recebimento => recebimento.checked ).flatMap( recebimento => recebimento.id );
		const despesaIds = state.despesaDataSource.filter( despesa => despesa.checked ).flatMap( despesa => despesa.id );
		dispatch( { type: DELETE_BATCH, payload: { recebimentoIds: recebimentoIds, despesaIds: despesaIds } } );
	}

	function openHistoricoSaldoLista() {		
		NavigatorHelper.pushPage( 
			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<HistoricoSaldoLista />
			</SaldoAnualContext.Provider>
		);
	}

	function onCopiarTudo() {
		const mesDestination = moment().format( 'MMYYYY' );
		const mesSource = state.month.format( 'MMYYYY' );

		db.copySourceMonthToDestinationMonth( mesSource, mesDestination );
		dispatch( { type: CHANGE_MONTH, payload: { month: moment() } } );
		//NavigatorHelper.popPage();
	}

	function goToMesAtual() {
		dispatch( { type: CHANGE_MONTH, payload: { month: moment() } } );
	}

	/**
	|--------------------------------------------------
	| Render
	|--------------------------------------------------
	*/
    const toolbar = (
		<Toolbar>
			<div className="left">
				{ isDeleteMode || isOldMonth ? <ToolbarButton onClick={ () => isOldMonth ? goToMesAtual() : dispatch( { type: LIST_MODE } ) }><Icon icon="ion-arrow-back, material:md-arrow-left" /></ToolbarButton> : null }
				{ !isDeleteMode && !isOldMonth ? <ToolbarButton><Icon icon="ion-navicon, material:md-menu" /></ToolbarButton> : null }
			</div>
        	<div className="center">{ isDeleteMode ? recebimentoSelectCount + despesaSelectCount : state.month.format( 'MMMM' ).toUpperCase() + ' | ' + state.month.format( 'YYYY ') }</div>
			<div className="right">
				{ !isDeleteMode && !isOldMonth ? <ToolbarButton onClick={ () => openHistoricoSaldoLista() }><Icon icon="ion-time, material:md-time" /></ToolbarButton> : null }
				{ isDeleteMode ? <ToolbarButton onClick={ () => onDeleteBatch() }><Icon icon="ion-trash, material:md-delete" /></ToolbarButton> : null }
			</div>
      </Toolbar>
	);

	const fab = (
		<Fab position="bottom right" onClick={ () => setShowActionSheet( true ) }><Icon icon='fa-plus' /></Fab>
	);
    
    return (
        <Page renderToolbar={ () => toolbar } renderFixed={ () => fab }>
			<div style={{ marginTop: '20px' }}>
				{ isOldMonth ? <Button onClick={ () => onCopiarTudo() } modifier="large--quiet" style={{ marginBottom: '30px', padding: '10px', color: '#e0e0e0', border: '2px dashed currentColor', borderRadius: '28px' }}>COPIAR TUDO PARA MÊS ATUAL</Button> : null }
				<div style={{ textAlign: 'center', fontSize: '13px', opacity: '0.56' }}>Saldo previsto para o mês</div>
				<div style={{ textAlign: 'center', fontSize: '32px', margin: '4px 0', color: ( recebimentoTotal - despesaTotal ) >= 0 ? 'rgba( 0, 255, 0, 0.7 )' : 'rgba( 255, 0, 0, 0.7 )' }}>{ toMoney( recebimentoTotal - despesaTotal ) }</div>
			</div>

			<SaldoAnualContext.Provider value={ [state, dispatch] }>
				<RecebimentoLista />
				<DespesaLista />
			</SaldoAnualContext.Provider>

			<ActionSheet isOpen={ showActionSheet } onCancel={ () => setShowActionSheet( false ) } title="Adicionar">
				<ActionSheetButton icon="" onClick={ () => openRecebimento() }>Novo recebimento</ActionSheetButton>
				<ActionSheetButton icon="" onClick={ () => openDespesa() }>Nova despesa</ActionSheetButton>
			</ActionSheet>
        </Page>
    );
}