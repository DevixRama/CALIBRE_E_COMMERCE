
// export const aysncWrappe = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next)
//     }
// }

export const asyncWrapper = (fn) => {

    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }

}


