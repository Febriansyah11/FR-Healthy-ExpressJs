const core = require('../../config/core.config')
const models = core.models();

exports.getWeight = async (req, res) => {
    try {
        const result = await models.tb_weight.findAll()
        if (result) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
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

exports.countWeight = async (req, res) => {
    try {

        // get all list weight
        const dataWeight = await models.tb_weight.findAll()

        // perhitungan data yang diinput user
        let data = req.body
        let stringHeight = String(data.height).slice(0, 1) + '.' + String(data.height).slice(1, 3)
        let height = parseFloat(stringHeight) * parseFloat(stringHeight)
        let weight = parseFloat(Number(data.weight))
        let resultCount = parseFloat(parseFloat(weight / height).toString().slice(0, 5))

        let responseWeight = {}

        // mencocokan data user dengan list weight didatabase (dia masuk ke range weignt mana)
        dataWeight.forEach(item => {
            if (resultCount >= item.weight_min && resultCount <= item.weight_max) {
                responseWeight = item
            }
        });

        // let responseUser = {
        //     user_height: stringHeight,
        //     user_weight: String(weight),
        //     weight_position: String(resultCount)
        // }

        let response = {
            weight_position: resultCount,
            weight_health: responseWeight.weight_type,
        }
        if (resultCount) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
                },
                data: {
                    weight_position: resultCount,
                    weight_health: responseWeight.weight_type,
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Something went wrong!'
                },
                data: data
            }
        }
        if (req?.call) return response
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
