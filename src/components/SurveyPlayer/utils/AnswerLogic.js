export const isRequired = (item) => item?.complusory === true;

export const isEmpty = (item, value) => {
    if (value === null || value === undefined || value === '') return true;

    if (item?.allowCustomValue) {
        const rows = item?.data?.rows || [];
        const columns = item?.data?.columns || [];

        for (let row of rows) {
            for (let col of columns) {
                const cellValue = value?.[row]?.[col];
                if (cellValue === undefined || cellValue === null || cellValue === '') {
                    return true;
                }
            }
        }
        return false;
    }

    const subQuestionIds = item?.questions || item?.data?.rows || item?.data?.columns || [];
    if (typeof value === 'object' && !Array.isArray(value)) {
        if (subQuestionIds.length === 0) {
            return Object.values(value).some(subValue => subValue === null || subValue === undefined || subValue === '');
        }
        for (let subId of subQuestionIds) {
            if (!value.hasOwnProperty(subId) || value[subId] === null || value[subId] === undefined || value[subId] === '') {
                return true;
            }
        }
        return false;
    } else {
        return value === '';
    }
};

export const isValueFilled = (val) => {
    if (val === null || val === undefined) return false;

    if (typeof val === "string") return val.trim() !== "";

    if (Array.isArray(val)) return val.length > 0;

    if (typeof val === "object") {
        return Object.values(val).some(v => isValueFilled(v));
    }

    return true; // sayılar, boolean vb. dolu kabul edilir
};
