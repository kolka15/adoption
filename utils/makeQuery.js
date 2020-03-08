const esc = encodeURIComponent;

const isPrimitive = test => test !== Object(test);

const query = params => {
    if (!params) return '';
    return Object.keys(params)
        .map(key => `${esc(key)}=${params[key] ? esc(isPrimitive(params[key]) ? params[key] : params[key]['value']) : esc(' ')}`)
        .join('&');
};

export default query;