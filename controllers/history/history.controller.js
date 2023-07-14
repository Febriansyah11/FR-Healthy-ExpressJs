const core = require('../../config/core.config')
const models = core.models();
const userController = require('../user/user.controller')
const sleepController = require('../sleep/sleep.controller')
const waterController = require('../water/water.controller')
const calorieController = require('../calorie/calorie.controller')
const weightController = require('../weight/weight.controller')


exports.getHistory = async (req, res) => {
    let output = null

    try {
        let qsId = Number(req.query.id)

        const result = await models.tb_history.findAll({
            where: {
                id_user: qsId
            },
            order: [
                ['created_at', 'DESC'],
                // ['name', 'ASC'],
            ],
        })
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

exports.createHistory = async (req, res) => {
    let output = null

    try {


        let reqData = req.body

        let rawUser = {
            call: true,
            query: {
                id: reqData.id_user
            }
        }
        let dataUser = await userController.getUser(rawUser, {})

        let rawSleep = {
            call: true,
            query: {
                age: dataUser.age,
                hours: reqData.sleep_time
            }
        }

        let rawWater = {
            call: true,
            query: {
                water: reqData.water_amount
            }
        }

        let rawCalorie = {
            call: true,
            query: {
                gender: dataUser.gender,
                calorie: reqData.calorie_amount
            }
        }

        let rawWeight = {
            call: true,
            body: {
                height: reqData.height,
                weight: reqData.weight
            }
        }

        let responseSleep = await sleepController.selectSleep(rawSleep, {})
        let responseWater = await waterController.waterSelect(rawWater, {})
        let responseCalorie = await calorieController.selectCalorie(rawCalorie, {})
        let responseWeight = await weightController.countWeight(rawWeight, {})

        let newHistory = {
            'id_user': dataUser.id_user,
            "weight": reqData.weight,
            "height": reqData.height,
            "calorie_type": responseCalorie,
            "weight_type": responseWeight.weight_health,
            "water_type": responseWater,
            "sleep_type": responseSleep
        }

        await models.tb_history.create(newHistory)

        await models.tb_user.update(
            {
                "weight": reqData.weight,
                "height": reqData.height
            },
            {
                where: {
                    'id_user': dataUser.id_user
                }
            }
        )
        let userUpdate = await userController.getUser(rawUser, {})


        if (reqData.weight && reqData.height) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
                },
                data: userUpdate
            }
        } else {
            output = {
                status: {
                    code: 404,
                    message: 'Something went wrong!'
                },
                data: newHistory
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