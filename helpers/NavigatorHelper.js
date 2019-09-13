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
    static pushPage( pageComponent ) {
        NavigatorHelper.navigator.pushPage( pageComponent );
    }
}