import { ref } from 'vue'

export default function useLocationMap() {

    const zoom = ref(13)

    const center = ref([6.252105,-75.5880829,14])

    function pin(e) {
        // console.log(e.target._latlng)
        // console.log(e.target.getLatLng())
        const marker = e.target.getLatLng()
        
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}