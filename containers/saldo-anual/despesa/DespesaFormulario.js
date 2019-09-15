import React from 'react';
import NavigatorHelper from '../../../js/NavigatorHelper';
import { SaldoAnualContext, RERENDER, INSERT_DESPESA, UPDATE_DESPESA } from '../SaldoAnualReducer';

import { Toolbar, Input, Page, BackButton, Fab, Icon, Switch } from 'react-onsenui';

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
    const [state, dispatch] = React.useContext( SaldoAnualContext );
    const despesa = props.despesa || { nome: '', valor: 0, pago: false };

    /**
    |--------------------------------------------------
    | Functions
    |--------------------------------------------------
    */

    function onSave() {
        const action = despesa.id ? UPDATE_DESPESA : INSERT_DESPESA;
        const data = {
            id: despesa.id,
            nome: despesa.nome,
            valor: parseFloat( despesa.valor ),
            pago: despesa.pago,
        };

        dispatch( { type: action, payload: { ...data } } );
        NavigatorHelper.popPage();
    }

    /**
    |--------------------------------------------------
    | Render
    |--------------------------------------------------
    */
    const toolbar = (
        <Toolbar>
            <div className="left"><BackButton>Back</BackButton></div>
            <div className="center">{ despesa.id ? 'Alterar despesa' : 'Nova despesa' }</div>
            <div className="right">
                <div style={{ position: 'relative', top: 'calc( 50% - 12px )' }}>
                    <Switch inputId="pago" checked={ despesa.pago } onChange={ () => { despesa.pago = !despesa.pago; dispatch( { type: RERENDER } ); } } style={{ display: 'block' }} />
                    <label htmlFor="pago" style={{ lineHeight: '1', position: 'absolute', top: '26px', left: '0', fontSize: '12px', opacity: '0.56' }}>{ despesa.pago ? 'Pago' : 'A pagar' }</label>
                </div>
            </div>
        </Toolbar>
    );
    
    return(
        <Page renderToolbar={ () => toolbar }>
            <div style={{ padding: '20px' }}>
                <label htmlFor="descricao" style={{ display: 'block', fontSize: '13px', opacity: '0.56', marginBottom: '4px' }}>Descrição</label>
                <Input inputId="descricao" value={ despesa.nome } onChange={ ( event ) => despesa.nome = event.target.value } style={{ width: '100%' }} />
                
                <div style={{ height: '20px' }} />

                <label htmlFor="valor" style={{ display: 'block', fontSize: '13px', opacity: '0.56', marginBottom: '4px' }}>Valor (R$)</label>
                <Input className="input-lg" inputId="valor" type="number" value={ despesa.valor } onChange={ ( event ) => despesa.valor = event.target.value } style={{ width: '100%' }} />
            </div>

            <Fab position="bottom right" onClick={ () => onSave() }><Icon icon='fa-save' /></Fab>
        </Page>
    );
}