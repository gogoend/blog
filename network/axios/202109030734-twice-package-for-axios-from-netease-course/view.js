import qa from './api/index.js'

export default {
    template: '<div />',
    data () {
        return {
            list: []
        }
    },
    mounted () {
        qa.v(this)
        qa.biz.list()
    }
}