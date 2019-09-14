/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default class NavigatorHelper {

    /**
     * 
     */
    constructor() {}

    /**
     *
     */
    static renderer( route, navigator ) {
        NavigatorHelper.navigator = navigator;
        return route;
    }
    
    /**
     *
     */
    static pushPage( pageComponent, options = {} ) {
        NavigatorHelper.navigator.pushPage( pageComponent, { animation: 'slide' } );
    }
}