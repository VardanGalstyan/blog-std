export const handleFilter = (data, value) => {
    return data.filter(item => {
        return item.title.toLowerCase().includes(value.toLowerCase())
    })
}