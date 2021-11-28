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
}

const transformName = (cat: ICat) => {
    cat.name = cat.name[0].toUpperCase() + cat.name.substring(1)
}

const addUid = (cat: ICat) => {
    cat.uid = uid++
}

const processors = [transformBirthday, transformName, addUid]

const composedProcessors = compose(processors)

catCollection.forEach(composedProcessors)

function compose(processors: Function[]) {
    if (!Array.isArray(processors)) throw new TypeError('Processors stack must be an array!')
    for (const fn of processors) {
      if (typeof fn !== 'function') throw new TypeError('Processors must be composed of functions!')
    }

    return (context) => {
        // 虽然执行正确，但应该不是这样使用
        processors.forEach(fn => fn(context))

        return context
    }
}
