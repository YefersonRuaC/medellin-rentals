import { computed, ref } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export default function useProperties() {

    const forSale = ref(false)
    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propertiesCollection = useCollection(collection(db, 'properties'))

    async function deleteItem(id, urlImage) {
        if(confirm('Do you want to delete this property?')) {
            
            const docRef = doc(db, 'properties', id)
            const imageRef = storageRef(storage, urlImage)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }

    const filteredItems = computed(() => {
        return forSale.value ? 
            propertiesCollection.value.filter( property => property.forSale ) :
            propertiesCollection.value
    })

    return {
        forSale,
        propertiesCollection,
        // propertyPrice
        filteredItems,
        deleteItem
    }
}