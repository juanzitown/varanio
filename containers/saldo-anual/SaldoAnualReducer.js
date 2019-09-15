import React from 'react';
import * as db from '../../js/DatabaseHelper';
import moment from 'moment/min/moment-with-locales';

moment.locale( 'pt-BR' );
const month = moment();
console.log( month.format( 'MMYYYY' ) );

/**
 * 
 */
export const RERENDER = 'RERENDER';
export const DELETE_MODE = 'DELETE_MODE';
export const LIST_MODE = 'LIST_MODE';

export const INSERT_RECEBIMENTO = 'INSERT_RECEBIMENTO';
export const UPDATE_RECEBIMENTO = 'UPDATE_RECEBIMENTO';

export const INSERT_DESPESA = 'INSERT_DESPESA';
export const UPDATE_DESPESA = 'UPDATE_DESPESA';

export const DELETE_BATCH = 'DELETE_BATCH';

/**
 * 
 */
export const saldoAnualInitialProps = {
    recebimentoDataSource: db.list( 'recebimento' + month.format( 'MMYYYY' ) ),
    despesaDataSource: db.list( 'despesa' + month.format( 'MMYYYY' ) ),
	isDeleteMode: false,
	month: month,
}

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export const saldoAnualReducer = ( state = saldoAnualMainState, action ) => {
    switch ( action.type ) {
        case RERENDER:
            return state = { ...state, ...action.payload };

        case INSERT_RECEBIMENTO:
            var recebimento = action.payload;
            var month = state.month;
            var key = 'recebimento' + month.format( 'MMYYYY' );
            console.log( db.insert( key, recebimento ) );
            state.recebimentoDataSource = db.list( key );
            return state = { ...state };

        case UPDATE_RECEBIMENTO:
            var recebimento = action.payload;
            var month = state.month;
            var key = 'recebimento' + month.format( 'MMYYYY' );
            console.log( db.update( key, recebimento ) );
            state.recebimentoDataSource = db.list( key );
            return state = { ...state };

        case INSERT_DESPESA:
            var despesa = action.payload;
            var month = state.month;
            var key = 'despesa' + month.format( 'MMYYYY' );
            console.log( db.insert( key, despesa ) );
            state.despesaDataSource = db.list( key );
            return state = { ...state };

        case UPDATE_DESPESA:
            var despesa = action.payload;
            var month = state.month;
            var key = 'despesa' + month.format( 'MMYYYY' );
            console.log( db.update( key, despesa ) );
            state.despesaDataSource = db.list( key );
            return state = { ...state };

        case DELETE_BATCH:
            var despesaIds = action.payload.despesaIds || [];
            var recebimentoIds = action.payload.recebimentoIds || [];
            var month = state.month;
            var despesaKey = 'despesa' + month.format( 'MMYYYY' );
            var recebimentoKey = 'recebimento' + month.format( 'MMYYYY' );

            console.log( db.deleteBatch( recebimentoKey, recebimentoIds ) );
            console.log( db.deleteBatch( despesaKey, despesaIds ) );
            state.recebimentoDataSource = db.list( recebimentoKey );
            state.despesaDataSource = db.list( despesaKey );
            state.isDeleteMode = false;

            return state = { ...state };

        case DELETE_MODE:
            state.recebimentoDataSource.map( recebimento => recebimento.checked = false );
            state.despesaDataSource.map( despesa => despesa.checked = false );
            state.isDeleteMode = true;
            return state = { ...state, ...action.payload };

        case LIST_MODE:
                state.isDeleteMode = false;
                return state = { ...state, ...action.payload };

        default:
            return state;
    }
};

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export const SaldoAnualContext = React.createContext( null );