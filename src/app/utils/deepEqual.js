function deepEqual(Obj1, Obj2) {
    if ( Object.keys(Obj1).length !== Object.keys(Obj2).length) {
        return false;
    }
    if ( Obj1 === Obj2 ) {
        return true;
    } else {
        for (let key in Obj1) {

            if (key in Obj2) {

                switch (typeof Obj1[key]) {

                    case 'number':
                        if (Obj1[key] === Obj2[key]) {
                            continue;
                        } else {
                            return false;
                        }
                        break;

                    case 'string':
                        if (Obj1[key] === Obj2[key]) {
                            continue;
                        } else {
                            return false;
                        }
                        break;

                    case  'object' :
                        if (Obj1[key] instanceof Array) {
                            if ( !deepEqual(Obj1[key], Obj2[key]) ) {
                                return false;
                            }
                        }

                        if (Obj1[key] instanceof Date) {
                            if ( Obj1[key].valueOf() !== Obj2[key].valueOf() ) {
                                return false;
                            }
                            continue;
                        }
                        if (Obj1[key] instanceof Object) {
                            if ( !deepEqual(Obj1[key], Obj2[key]) ) {
                                return false;
                            }
                        }
                        break;

                    case 'boolean' :
                        if ( Obj1[key] !== Obj2[key] ) {
                            return false;
                        } else {
                            continue;
                        }
                        break;
                    case 'function' :
                        if ( Obj1[key].toString() !== Obj2[key].toString() ) {
                            return false;
                        } else {
                            continue;
                        }
                        break;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    deepEqual : deepEqual
};