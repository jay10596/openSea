import { Component } from 'react';
    
import AOS from "aos";

class Animation extends Component {
    constructor() {
        super()

        AOS.init()

        this.root = document.querySelector('#root')

        // this.newPackage()
    }

    newPackage() {
        this.root.style.background = 'grey';
    }
}

export default new Animation();



/*  
    We are calling class 'export default new Animation();'/ function 'export default Animation();' directly while exporting.
    Why? Because now we only have to import this class. We don't have to call in in JSX like <Application />.
    If you are calling functions directly, you can't use Hooks because they only used when the component is mounted in JSX.
    Functional Component example to call Animation is below.

    import AOS from "aos";

    const Animation = () => {
        AOS.init()   

        const root = document.querySelector('#root')

        newPackage(root)
    }

    function newPackage(root) {
        root.style.background = 'grey';
    }

    export default Animation();
*/