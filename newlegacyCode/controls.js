class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (type){
            case 'KEYS':
                this.#addKeyboardlisteners();
                break;
                case 'DUMMY':
                    this.forward = true;
                    break;
        }

    }
    #addKeyboardlisteners() {
        document.addEventListener('keydown',(event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.left = true;
//                    event.preventDefault();
                    break;
                    case 'ArrowRight':
                        this.right = true;
//                        event.preventDefault();
                        break;
                        case 'ArrowUp':
                            this.forward = true;
//                            event.preventDefault();
                            break;
                            case 'ArrowDown':
                                this.reverse = true;
//                                event.preventDefault();
                                break;

            }
//            console.table(this); this was for debugging
        });
        //        because we need to know when we release a key press
        document.addEventListener('keyup',(event) => {
            switch (event.key){
                case 'ArrowLeft':
                    this.left = false;
//                    event.preventDefault();
                    break;
                    case 'ArrowRight':
                        this.right = false;
//                        event.preventDefault();
                        break;
                        case 'ArrowUp':
                            this.forward = false;
//                            event.preventDefault();
                            break;
                            case 'ArrowDown':
                                this.reverse = false;
//                                event.preventDefault();
                                break;
            }
//            console.table(this);
        });
    }
}