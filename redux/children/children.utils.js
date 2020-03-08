export const getChildrenTotal = (total) => {
    let totalStr = total.toString().split('');
    switch (totalStr.length) {
    case 4:
        return `${totalStr.slice(0, 1).join('')} ${totalStr.slice(1).join('')}`;
    case 5:
        return `${totalStr.slice(0, 2).join('')} ${totalStr.slice(2).join('')}`;
    case 6:
        return `${totalStr.slice(0, 3).join('')} ${totalStr.slice(3).join('')}`;
    default:
        return totalStr;
    }
};
