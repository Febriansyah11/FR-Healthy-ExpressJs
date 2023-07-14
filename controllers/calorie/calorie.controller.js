const core = require('../../config/core.config')
const models = core.models();

exports.getCalorie = async (req, res) => {
    try {
        const result = await models.tb_calorie.findAll()
        console.log("🚀 ~ file: calorie.controller.js ~ line 7 ~ exports.getCalorie= ~ result", result)
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

exports.selectCalorie = async (req, res) => {
    let output = null
    try {
        let qsGender = String(req.query.gender)
        let qsCalorie = Number(req.query.calorie)

        const listCalorie = await models.tb_calorie.findAll()

        let calorieMatching = {}
        listCalorie.forEach(item => {
            if (qsGender.toLocaleLowerCase() == item.gender) {
                calorieMatching = item
            }
        });

        let calorieHealth = ''
        let errorMessage = ''
        if (qsCalorie >= calorieMatching.calorie_min && qsCalorie <= calorieMatching.calorie_max) {
            calorieHealth = 'Ideal'
        } else if (qsCalorie < calorieMatching.calorie_min) {
            calorieHealth = 'Kurang'
        } else if (qsCalorie > calorieMatching.calorie_max) {
            calorieHealth = 'Berlebihan'
        } else {
            errorMessage = 'Masukan calorie dengan benar!'
        }

        let response = {
            calorieHealth: calorieHealth
        }

        if (calorieHealth) {
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
        if (req?.call) return calorieHealth
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