import _ from 'lodash';

export function flat(value, basepath, master = {}) {
    if(_.isPlainObject(value)) {
        for(let key of _.keys(value)){ 
            let path = basepath ?  `${basepath}.${key}` : key;
            let valueOf = value[key];
            flat(valueOf, path, master);
        }
    }
    else if (_.isArray(value)) {
        for(let item of value) {
            flat(item, basepath, master)
        }
    }
    else {
        if(master[basepath]) {
            if(_.isArray(master[basepath])) {
                master[basepath].push(value);
            } else {
                master[basepath] = [master[basepath], value]
            }
        } else {
            master[basepath] = value;
        }
    }
    return master;
}

export const hashCode = function(str){
    var hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash &= hash; // Convert to 32bit integer
    }
    return hash;
}