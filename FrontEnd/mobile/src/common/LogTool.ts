
function logD(tag: string, message: any) {
    if (process.env.NODE_ENV === 'development') {
        console.log(tag, message)
    }
}

export {logD}