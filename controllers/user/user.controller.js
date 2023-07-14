const core = require('../../config/core.config')
const models = core.models();

exports.login = async (req, res) => {
    let output = null
    try {
        const query = req.query;
        const result = await models.tb_user.findOne({
            where: {
                username: query.user,
                password: query.password
            }
        })
        if (result) {
            output = {
                status: {
                    code: 200,
                    message: 'Get data success'
                },
                data: result
            }
        } else {
            output = {
                status: {
                    code: 404,
                    message: 'User not found'
                },
                data: result
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    res.status(output.status.code).send(output)
}
exports.getUser = async (req, res) => {
    let output = null
    try {
        const query = req.query;
        const result = await models.tb_user.findOne({
            where: {
                id_user: query.id,
            }
        })
        if (result) {
            output = {
                status: {
                    code: 200,
                    message: 'Get data success'
                },
                data: result
            }
        } else {
            output = {
                status: {
                    code: 404,
                    message: 'User not found'
                },
                data: result
            }
        }
        if (req?.call) return result

    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    if (!req?.call) res.status(output.status.code).send(output)
}

exports.login = async (req, res) => {
    let output = null
    try {
        const query = req.query;
        const result = await models.tb_user.findOne({
            where: {
                username: query.user,
                password: query.password
            }
        })
        if (result) {
            output = {
                status: {
                    code: 200,
                    message: 'Get data success'
                },
                data: result
            }
        } else {
            output = {
                status: {
                    code: 404,
                    message: 'User not found'
                },
                data: result
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    res.status(output.status.code).send(output)
}
exports.registrasi = async (req, res) => {
    let output = null
    try {
        const body = req.body;
        const user = await models.tb_user.findOne({
            where: {
                username: body.username,
            }
        })

        if (user) {
            output = {
                status: {
                    code: 409,
                    message: 'Username sudah pernah digunakan!'
                },
                data: {
                    username: body.username
                }
            }
        } else {
            const newUser = await models.tb_user.create({
                "username": body.username,
                "password": body.password,
                "gender": String(body.gender).toLocaleLowerCase(),
                "age": body.age,
                "weight": body.weight,
                "height": body.height
            })
            output = {
                status: {
                    code: 200,
                    message: 'User berhasil dibuat!'
                },
                data: newUser
            }

        }


    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    res.status(output.status.code).send(output)
}