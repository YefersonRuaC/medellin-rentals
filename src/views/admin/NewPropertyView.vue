<script setup>
    import { useForm, useField } from 'vee-validate'
    import { collection, addDoc } from 'firebase/firestore'
    import { useFirestore } from 'vuefire'
    import { useRouter } from 'vue-router'
    import { validationSchema, imageSchema } from '@/validation/propertySchema'
    import useImage from '@/composables/useImage'
    import useLocationMap from '@/composables/useLocationMap'
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

    const items = [1,2,3,4,5]

    //Destructuring composables
    const { url, uploadImage, imagePreview } = useImage()
    const { zoom, center, pin } = useLocationMap()
    const router = useRouter()
    const db = useFirestore()

    const { handleSubmit } = useForm({
        validationSchema : {
            ...validationSchema,
            ...imageSchema
        }
    })

    //Inputs validation
    const title = useField('title')
    const image = useField('image')
    const price = useField('price')
    const rooms = useField('rooms')
    const wc = useField('wc')
    const parking = useField('parking')
    const description = useField('description')
    const forSale = useField('forSale', null, {
        initialValue: false
    })

    const submit = handleSubmit( async(values) => {
        
        const { image, ...property } = values

        const docRef = await addDoc(collection(db, "properties"), {
            ...property,
            image: url.value,
            ubication: center.value
        });

        if(docRef.id) {
            router.push({name: 'admin-properties'})
        }
    })

</script>

<template>
    <v-card max-width="800" flat class="mx-auto my-5 grey-lighten-3">
        <v-btn
            variant="tonal"
            color="secondary"
            :to="{name: 'admin-properties'}"
        >
            Back
        </v-btn>
        <v-card-title
            class="text-h4 font-weight-bold"
        >
            New property
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Create a new property by filling this form
        </v-card-subtitle>

        <v-form class="my-7">
            <v-text-field 
                class="mb-5"
                label="Property title"
                v-model="title.value.value"
                :error-messages="title.errorMessage.value"
            />

            <v-file-input
                accept="image/jpeg"
                label="Photography"
                prepend-icon="mdi-camera"
                class="mb-5"
                v-model="image.value.value"
                :error-messages="image.errorMessage.value"
                @change="uploadImage"
            />

            <div v-if="imagePreview" class="my-5">
                <p class="font-weight-bold">Property image: </p>
                <img class="w-50" :src="imagePreview">
            </div>
            
            <v-checkbox 
                label="Check only if the property is for sale"
                v-model="forSale.value.value"
                :error-messages="forSale.errorMessage.value"
            />

            <v-text-field
                class="mb-5"
                label="Total price / Price per month"
                v-model="price.value.value"
                :error-messages="price.errorMessage.value"
            />

            <v-row>
                <v-col cols="12" md="4">
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
    
                <v-col cols="12" md="4">
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
                class="mb-5" 
                label="Description"
                v-model="description.value.value"
                :error-messages="description.errorMessage.value"
            ></v-textarea>

            <h2 class="font-weight-bold text-center mb-5">Location</h2>
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
                color="green-accent-4"
                class="text-white"
                block
                @click="submit"
            >
                Add property
            </v-btn>
        </v-form>
    </v-card>
</template>