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
    static pushPage( pageComponent, options = { animation: 'slide' } ) {
        NavigatorHelper.navigator.pushPage( pageComponent, options );
    }

    /**
     * 
     */
    static popPage( options = { animation: 'slide' } ) {
        NavigatorHelper.navigator.popPage( options );
    }
}