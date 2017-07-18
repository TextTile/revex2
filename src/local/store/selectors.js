import _ from 'lodash';

export const selectors = _.memoize((store, remote) => {
    return {
        selectTextFields: _.memoize(() => {
            return _.values(remote.mapping).filter(d => d.type === "Text")
        }),
        selectStructuredFields: _.memoize(() => {
            return _.values(remote.mapping).filter(d => d.type !== "Text")
        })
    }
})
