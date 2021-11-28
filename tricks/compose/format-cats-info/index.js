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
    return cat;
};
var transformName = function (cat) {
    cat.name = cat.name[0].toUpperCase() + cat.name.substring(1);
    return cat;
};
var addUid = function (cat) {
    cat.uid = uid++;
    return cat;
};
var composedProcessors = compose(transformBirthday, transformName, addUid);
catCollection.forEach(composedProcessors);
function compose() {
    var processors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        processors[_i] = arguments[_i];
    }
    if (!Array.isArray(processors))
        throw new TypeError('Processors stack must be an array!');
    for (var _a = 0, processors_1 = processors; _a < processors_1.length; _a++) {
        var fn = processors_1[_a];
        if (typeof fn !== 'function')
            throw new TypeError('Processors must be composed of functions!');
    }
    return function (context) {
        var result = context;
        var dispatch = function (i) {
            var currentFn = processors[i];
            if (!currentFn) {
                return result;
            }
            result = currentFn(result);
            return dispatch(i + 1);
        };
        return dispatch(0);
    };
}
