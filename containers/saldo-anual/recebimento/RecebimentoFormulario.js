import React from 'react';
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
    const recebimento = props.recebimento || {}; //|| { nome: 'High Sales', valor: 2600 };

    /**
    |--------------------------------------------------
    | Functions
    |--------------------------------------------------
    */

    function onSave() {

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
                <Input inputId="valor" value={ recebimento.valor } onChange={ ( event ) => recebimento.valor = event.target.value } style={{ width: '100%' }} />
            </div>

            <Fab position="bottom right" onClick={ () => onSave() }><Icon icon='fa-save' /></Fab>
        </Page>
    );
}