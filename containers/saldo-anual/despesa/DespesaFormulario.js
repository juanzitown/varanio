import React from 'react';
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

    const despesa = props.despesa || {};
    const [pago, setPago] = React.useState( despesa.pago );

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
            <div className="center">{ despesa.id ? 'Alterar despesa' : 'Nova despesa' }</div>
            <div className="right">
                <div style={{ position: 'relative', top: 'calc( 50% - 12px )' }}>
                    <Switch inputId="pago" checked={ pago } onChange={ () => setPago( !pago ) } style={{ display: 'block' }} />
                    <label htmlFor="pago" style={{ lineHeight: '1', position: 'absolute', top: '26px', left: '0', fontSize: '12px', opacity: '0.56' }}>{ pago ? 'Pago' : 'A pagar' }</label>
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
                <Input inputId="valor" value={ despesa.valor } onChange={ ( event ) => despesa.valor = event.target.value } style={{ width: '100%' }} />
            </div>

            <Fab position="bottom right" onClick={ () => onSave() }><Icon icon='fa-save' /></Fab>
        </Page>
    );
}