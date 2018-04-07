function _generateJSON(code, text, data) {
    if(!code || !text) return false;

    var json = {
        "code": code,
        "message": text,
    };

    if(data) json.data = data;

    return JSON.stringify(json);
}

class BodyAnswer {
    error(code, text) {
        if(!code) code = 500;
        if(!text) text = this.ERROR_STRING;

        return _generateJSON(code, text, data);
    }

    success(data, code, text) {
        if(!code) code = 200;
        if(!text) text = this.SUCCESS_STRING;

        return _generateJSON(code, text, data);
    }
}

const bodyAnswer = new BodyAnswer();

bodyAnswer.ERROR_STRING = 'Internal server error';
bodyAnswer.SUCCESS_STRING = 'Request is successful';

module.exports = bodyAnswer;