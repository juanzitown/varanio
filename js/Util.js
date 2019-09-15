/**
|--------------------------------------------------
| Util
|--------------------------------------------------
*/

/**
 * 
 */
export function toMoney( rawValue = 0, precision = 2 ) {
    return ( rawValue * 1 ).toLocaleString( 'pt-BR', { style: 'currency', currency: "BRL", minimumFractionDigits: precision } );
}