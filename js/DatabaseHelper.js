/**
|--------------------------------------------------
| DB COMMON 
|--------------------------------------------------
*/

/**
 * 
 */
export function list( key ) {
    if( !localStorage[key] ) localStorage[key] = JSON.stringify( [] );
    return JSON.parse( localStorage[key] );
}

/**
 * 
 */
export function insert( key, value ) {
    //assert
    if( !value ) throw "O valor inserido não pode ser nulo";
    if( value.id ) throw "Inserção não deveria possuir id. ID:" + value.id;
    if( !localStorage[key] ) localStorage[key] = JSON.stringify( [] );

    //set id
    value.id = new Date().getTime();

    //parses
    const array = JSON.parse( localStorage[key] );
    array.push( value );
    localStorage[key] = JSON.stringify( array );

    //return
    return value;
}

/**
 * 
 */
export function update( key, value ) {
    //assert
    if( !value ) throw "O valor atualizado não pode ser nulo";
    if( !value.id ) throw "Inserção deve possuir id";
    if( !localStorage[key] ) localStorage[key] = JSON.stringify( [] );

    //parses
    const array = JSON.parse( localStorage[key] );
    const existing = array.find( item => item.id === value.id );
    if( !existing ) throw "Nenhum registro encontrado. Key:" + key + ", ID: " + value.id;
    Object.assign( existing, value );
    localStorage[key] = JSON.stringify( array );

    //return
    return value;
}

/**
 * 
 */
export function deleteBatch( key, ids = [] ) {
    if( !localStorage[key] ) localStorage[key] = JSON.stringify( [] );

    //parses
    const array = JSON.parse( localStorage[key] );
    const newArray = array.filter( item => !ids.includes( item.id ) );
    const matchArray = array.filter( item => ids.includes( item.id ) );
    localStorage[key] = JSON.stringify( newArray );

    //return
    return matchArray;
}

/**
 * 
 */
export function copySourceMonthToDestinationMonth( sourceMonthKey, destinationMonthKey ) {
    const sourceDespesa = localStorage[ 'despesa' + sourceMonthKey ] || '[]';
    const destinationDespesa = localStorage[ 'despesa' + destinationMonthKey ] || '[]';
    const sourceRecebimento = localStorage[ 'recebimento' + sourceMonthKey ] || '[]';
    const destinationRecebimento = localStorage[ 'recebimento' + destinationMonthKey ] || '[]';

    //parses despesa
    const despesaSourceArray = JSON.parse( localStorage[ 'despesa' + sourceMonthKey ] );
    const despesaDestinationArray = JSON.parse( localStorage[ 'despesa' + destinationMonthKey ] );
    const newDespesaArray = [ ...despesaDestinationArray, ...despesaSourceArray ];
    localStorage[ 'despesa' + destinationMonthKey ] = JSON.stringify( newDespesaArray );

    //parses recebimento
    const recebimentoSourceArray = JSON.parse( localStorage[ 'recebimento' + sourceMonthKey ] );
    const recebimentoDestinationArray = JSON.parse( localStorage[ 'recebimento' + destinationMonthKey ] );
    const newRecebimentoArray = [ ...recebimentoDestinationArray, ...recebimentoSourceArray ];
    localStorage[ 'recebimento' + destinationMonthKey ] = JSON.stringify( newRecebimentoArray );

    return;
}