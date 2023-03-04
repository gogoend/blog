export default function vnode(type,data,children,text,elm) {
    const key = data === undefined ? undefined: data.key
    return {
        type,
        data,
        children,
        text,
        elm,
        key
    }
}