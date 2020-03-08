function cutText(str, charAmount) {
    if (typeof str !== 'string') return;
    if (str.length < charAmount) {
        return str;
    }
    const formattedStr = str.slice(0, charAmount);
    return formattedStr.slice(0, formattedStr.lastIndexOf(' ')) + '...';
}

export default cutText;
