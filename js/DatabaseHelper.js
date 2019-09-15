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