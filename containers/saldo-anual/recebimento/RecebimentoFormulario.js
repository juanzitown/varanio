import React from 'react';
import NavigatorHelper from '../../../js/NavigatorHelper';
import { SaldoAnualContext, INSERT_RECEBIMENTO, UPDATE_RECEBIMENTO } from '../SaldoAnualReducer';
import { Toolbar, Input, Page, BackButton, Fab, Icon } from 'react-onsenui';

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
    const recebimento = props.recebimento || { nome: '', valor: 0, };

    /**
    |--------------------------------------------------
    | Functions
    |--------------------------------------------------
    */

    function onSave() {
        const action = recebimento.id ? UPDATE_RECEBIMENTO : INSERT_RECEBIMENTO;
        const data = {
            id: recebimento.id,
            nome: recebimento.nome,
            valor: parseFloat( recebimento.valor ),
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
            <div className="center">{ recebimento.id ? 'Alterar recebimento' : 'Novo recebimento' }</div>
        </Toolbar>
    );
    
    return(
        <Page renderToolbar={ () => toolbar }>
            <div style={{ padding: '20px' }}>
                <label htmlFor="descricao" style={{ display: 'block', fontSize: '13px', opacity: '0.56', marginBottom: '4px' }}>Descrição</label>
                <Input inputId="descricao" value={ recebimento.nome } onChange={ ( event ) => recebimento.nome = event.target.value } style={{ width: '100%' }} />
                
                <div style={{ height: '20px' }} />

                <label htmlFor="valor" style={{ display: 'block', fontSize: '13px', opacity: '0.56', marginBottom: '4px' }}>Valor (R$)</label>
                <Input className="input-lg" inputId="valor" type="number" value={ recebimento.valor } onChange={ ( event ) => recebimento.valor = event.target.value } style={{ width: '100%', height: '50px', fontSize: '40px' }} />
            </div>

            <Fab position="bottom right" onClick={ () => onSave() }><Icon icon='fa-save' /></Fab>
        </Page>
    );
}