const core = require('../../config/core.config')
const models = core.models();

exports.getWater = async (req, res) => {
    try {
        const result = await models.tb_water.findAll()
        if (result) {
            output = {
                status: {
                    code: 200,
                    message: 'Get data success'
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

exports.waterSelect = async (req, res) => {
    try {
        let qsWater = Number(req.query.water)

        const listWater = await models.tb_water.findAll()

        let waterMatching = null
        listWater.forEach(item => {
            if (qsWater >= item.water_min && qsWater <= item.water_max) {
                waterMatching = item
            }
        });
        let waterHealth = ''
        let errorMessage = ''

        if (waterMatching) {
            waterHealth = waterMatching.average_water
        } else if (qsWater < listWater[0].water_min) {
            waterHealth = 'Kurang'
        } else if (qsWater > listWater[2].water_max) {
            waterHealth = 'Berlebihan'
        } else {
            errorMessage = 'Masukan jumlah gelas air diminum dengan benar!'
            waterHealth = 'Masukan jumlah gelas air diminum dengan benar!'

        }


        let response = {
            water_health: waterHealth
        }

        if (waterHealth) {
            output = {
                status: {
                    code: 200,
                    message: 'Get data success'
                },
                data: response
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Get data success'
                },
                data: errorMessage
            }
        }
        if (req?.call) return waterHealth
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
