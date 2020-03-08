function formatSelectOptions(options, irrelevantOption = true, label = '') {
    const formattedOptions = [];
    options.forEach((option => {
        const obj = {};
        obj.label = option.title || option.name_address;
        obj.value = option.id;
        if (option.title && option.title.includes('Усыновление РФ')) return false;
        formattedOptions.push(obj);
    }));
    if (irrelevantOption) {
        formattedOptions.unshift({
            value: -1,
            label: label || 'не имеет значения'
        });
    }
    return formattedOptions;
}

export default formatSelectOptions;