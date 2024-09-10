export const validationSchema = {

    title (value) {
        if (value?.length >= 6 ) return true
        return 'Property title is required or is too short'
    },
    price (value) {
        if (/^[0-9]+$/.test(value)) return true
        return 'Price must be a number'
    },
    rooms (value) {
        if (value) return true
        return 'Select a quantity'
    },
    wc (value) {
        if (value) return true
        return 'Select a quantity'
    },
    parking (value) {
        if (value) return true
        return 'Select a quantity'
    },
    description (value) {
        if (value) return true
        return 'Add a description'
    }
} 

export const imageSchema = {
    image (value) {
        if (value) return true
        return 'Image is required'
    },
}