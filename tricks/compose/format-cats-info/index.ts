interface ICat {
    name: string
    birthday: string | Date
    nation: string,
    uid?: number
}

let uid = 0

const catCollection = [{
    name: 'tom',
    birthday: '2019/4/10 18:32',
    nation: 'Thailand'
}, {
    name: 'lemon',
    birthday: '2019/4/10 13:20',
    nation: 'Singapore'
},  {
    name: 'cheery',
    birthday: '2020/1/10 16:56',
    nation: 'America'
},  {
    name: 'meow',
    birthday: '2020/1/10 16:56',
    nation: 'America'
}]

const transformBirthday = (cat: ICat) => {
    cat.birthday = new Date(cat.birthday as string)
    return cat
}

const transformName = (cat: ICat) => {
    cat.name = cat.name[0].toUpperCase() + cat.name.substring(1)
    return cat
}

const addUid = (cat: ICat) => {
    cat.uid = uid++
    return cat
}

const composedProcessors = compose<ICat>(transformBirthday, transformName, addUid)

catCollection.forEach(composedProcessors)

function compose<T>(...processors: Array<(arg: T) => T>) {
    if (!Array.isArray(processors)) throw new TypeError('Processors stack must be an array!')
    for (const fn of processors) {
      if (typeof fn !== 'function') throw new TypeError('Processors must be composed of functions!')
    }

    return (context: T): T => {
        let result = context

        let dispatch = (i: number) => {
            let currentFn = processors[i]
            if(!currentFn) {
                return result
            }
            result = currentFn(result)
            return dispatch(i+1)
        }

        return dispatch(0)
    }

}
