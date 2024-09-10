<script setup>
    import { watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useFirestore, useDocument } from 'vuefire'
    import { doc, updateDoc } from 'firebase/firestore'
    import { useField, useForm } from 'vee-validate'
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
    import useImage from '@/composables/useImage'
    import useLocationMap from '@/composables/useLocationMap'
    import { validationSchema } from '@/validation/propertySchema'

    const items = [1,2,3,4,5]

    const { url, uploadImage, imagePreview } = useImage()
    const { zoom, center, pin } = useLocationMap()

    const { handleSubmit } = useForm({ validationSchema });

    //Inputs validation
    const title = useField('title')
    const image = useField('image')
    const price = useField('price')
    const rooms = useField('rooms')
    const wc = useField('wc')
    const parking = useField('parking')
    const description = useField('description')
    const forSale = useField('forSale')

    const route = useRoute()
    const router = useRouter()
    const db = useFirestore()
    const docRef = doc(db, 'properties', route.params.id)
    const property = useDocument(docRef)

    //Filling inputs
    watch(property, (property) => {
        title.value.value = property.title
        price.value.value = property.price
        rooms.value.value = property.rooms
        wc.value.value = property.wc
        parking.value.value = property.parking
        description.value.value = property.description
        forSale.value.value = property.forSale
        center.value = property.ubication
    })  

    const submit = handleSubmit( async(values) => {
        
        const { image, ...property } = values

        if(imagePreview.value) {
            const data = {
                ...property,
                image: url.value,
                ubication: center.value
            }
            
            await updateDoc(docRef, data)

        } else {
            const data = {
                ...property,
                ubication: center.value
            }
            
            await updateDoc(docRef, data)
        }

        router.push({name: 'admin-properties'})
    })

</script>

<template>
    <v-card max-width="800" flat class="mx-auto mt-2">
        <v-btn
            variant="tonal"
            color="secondary"
            :to="{name: 'admin-properties'}"
        >
            Back
        </v-btn>
        <v-card-title class="mt-5">
            <h1 class="text-h4 font-weight-bold">Edit property</h1>
        </v-card-title>
        <v-card-subtitle > 
            <p class="text-h5">Edit the property details</p>
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                v-model="title.value.value"
                :error-messages="title.errorMessage.value"
                label="Title"
                class="mb-5"
            ></v-text-field>

            <v-file-input
                v-model="image.value.value"
                :error-messages="image.errorMessage.value"
                accept="image/jpeg"
                prepend-icon="mdi-camera"
                label="Photography"
                class="mb-5"
                @change="uploadImage"
            ></v-file-input>

            <div class="my-5">
                <p class="font-weight-bold">Current image:</p>
                <img 
                    v-if="imagePreview"
                    class="w-50"
                    :src="imagePreview" 
                    alt=""
                />
                <img 
                    v-else
                    class="w-50"
                    :src="property?.image" 
                    alt=""
                />
            </div>

            <v-checkbox 
                v-model="forSale.value.value"
                label="Check only if the property is for sale"
            ></v-checkbox>

            <v-text-field
                v-model="price.value.value"
                :error-messages="price.errorMessage.value"
                label="Total price / Price per month"
                class="mb-5"
            ></v-text-field>

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Rooms"
                        class="mb-5"
                        :items="items"
                        v-model="rooms.value.value"
                        :error-messages="rooms.errorMessage.value"
                    />
                </v-col>

                <v-col cols="12" md="4">
                    <v-select 
                        label="WC"
                        class="mb-5"
                        :items="items"
                        v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Parking slots"
                        class="mb-5"
                        :items="items"
                        v-model="parking.value.value"
                        :error-messages="parking.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea
                v-model="description.value.value"
                :error-messages="description.errorMessage.value"
                label="Description"
                class="mb-5"
            ></v-textarea>

            <h2 class="font-weight-bold text-center my-5">Location</h2>
            <div class="pb-10">
                <div style="height:600px">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false" 
                    >
                        <LMarker
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>

                <v-btn
                    color="light-blue-darken-1"
                    block
                    @click="submit"
                >
                    Save changes
                </v-btn>
        </v-form>
    </v-card>
</template>