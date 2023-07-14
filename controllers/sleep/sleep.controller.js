const core = require('../../config/core.config')
const models = core.models();

exports.getSleep = async (req, res) => {
    let output = null
    try {
        const result = await models.tb_sleep.findAll()
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

exports.selectSleep = async (req, res) => {
    let output = null
    try {
        let qsAge = Number(req.query.age)
        let qsHours = Number(req.query.hours)

        const listSleep = await models.tb_sleep.findAll()

        let sleepAgeMatching = {}
        listSleep.forEach(item => {
            if (qsAge >= item.age_min && qsAge <= item.age_max) {
                sleepAgeMatching = item
            }
        });

        let sleepHealth = ''
        let errorMessage = ''
        if (qsHours >= sleepAgeMatching.sleep_min && qsHours <= sleepAgeMatching.sleep_max) {
            sleepHealth = 'Cukup'
        } else if (qsHours < sleepAgeMatching.sleep_min) {
            sleepHealth = 'Kurang'
        } else if (qsHours > sleepAgeMatching.sleep_max) {
            sleepHealth = 'Berlebihan'
        } else {
            errorMessage = 'Masukan waktu tidur dengan benar!'
        }

        let response = {
            sleep_health: sleepHealth
        }
        if (sleepHealth) {
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
        if (req?.call) return sleepHealth

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
