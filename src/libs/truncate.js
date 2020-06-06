export default function (value, maxLength) {
    if (!value) return '';
    value = value.toString();
    return value.length > maxLength ? (value.slice(0, maxLength - 2).trim() + '...') : value;
}