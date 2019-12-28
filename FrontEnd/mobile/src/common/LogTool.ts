const NODE_ENV : string = 'development'

function logD(tag: string, message: any) {
    if (NODE_ENV === 'development') {
        console.log(tag, message)
    }
}

export {logD}