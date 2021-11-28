var uid = 0;
var catCollection = [{
        name: 'tom',
        birthday: '2019/4/10 18:32',
        nation: 'Thailand'
    }, {
        name: 'lemon',
        birthday: '2019/4/10 13:20',
        nation: 'Singapore'
    }, {
        name: 'cheery',
        birthday: '2020/1/10 16:56',
        nation: 'America'
    }, {
        name: 'meow',
        birthday: '2020/1/10 16:56',
        nation: 'America'
    }];
var transformBirthday = function (cat) {
    cat.birthday = new Date(cat.birthday);
};
var transformName = function (cat) {
    cat.name = cat.name[0].toUpperCase() + cat.name.substring(1);
};
var addUid = function (cat) {
    cat.uid = uid++;
};
var processors = [transformBirthday, transformName, addUid];
var composedProcessors = compose(processors);
catCollection.forEach(composedProcessors);
function compose(processors) {
    if (!Array.isArray(processors))
        throw new TypeError('Processors stack must be an array!');
    for (var _i = 0, processors_1 = processors; _i < processors_1.length; _i++) {
        var fn = processors_1[_i];
        if (typeof fn !== 'function')
            throw new TypeError('Processors must be composed of functions!');
    }
    return function (context) {
        // 虽然执行正确，但应该不是这样使用
        processors.forEach(function (fn) { return fn(context); });
        return context;
    };
}
