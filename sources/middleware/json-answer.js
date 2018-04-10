function _generateJSON(code, text) {
    let data = arguments[2];
    if(!code || !text) return false;

    var json = {
        "code": code,
        "message": text,
    };

    if(data) json.data = data;

    return JSON.stringify(json);
}

class BodyAnswer {
    error(ctx, code, text, data) {
        if(!code) code = 500;
        if(!text) text = this.ERROR_STRING;

        ctx.status = code;
        ctx.body = _generateJSON(code, text, data);
    }

    success(ctx, data, code, text) {
        if(!code) code = 200;
        if(!text) text = this.SUCCESS_STRING;

        ctx.status = code;
        ctx.body = _generateJSON(code, text, data);
    }
}

const bodyAnswer = new BodyAnswer();

bodyAnswer.ERROR_STRING = 'Internal server error';
bodyAnswer.SUCCESS_STRING = 'Request is successful';

module.exports = bodyAnswer;