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

        case DELETE_RECEBIMENTO_BATCH:
            var recebimentoIds = action.payload;
            var month = state.month;
            var key = 'recebimento' + month.format( 'MMYYYY' );
            console.log( db.deleteBatch( key, recebimentoIds ) );

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