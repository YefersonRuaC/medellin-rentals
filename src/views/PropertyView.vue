<script setup>
    import { watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { doc } from 'firebase/firestore'
    import { useDocument, useFirestore } from 'vuefire'
    import { propertyPrice } from '@/helpers'
    import useLocationMap from '@/composables/useLocationMap'
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"

    const { zoom, center } = useLocationMap()
    const route = useRoute()
    const db = useFirestore()
    const docRef = doc(db, 'properties', route.params.id)
    const property = useDocument(docRef)

    watch(property, (property) => {
        center.value = property.ubication
    })
    
</script>

<template>
    <v-card flat>
        <v-btn
            variant="tonal"
            color="secondary"
            :to="{name: 'home'}"
        >
            Back home
        </v-btn>
        <v-card-title class="text-h4 text-center py-3 font-weight-bold">
            {{ property?.title }}
        </v-card-title>

        <v-img :src="property?.image" class="elevation-2" height="500" cover />

        <v-row class="bg-grey-lighten-5 px-5 pb-4">
            <v-col cols="12" md="6">
                <div class="text-pre-wrap mt-7 elevation-">
                    <v-card-text class="font-weight-bold">
                        Price:
                        <span v-if="property?.forSale" class="font-weight-light">
                            {{ propertyPrice(property?.price) }}
                        </span>
                        <span v-else class="font-weight-light">
                            {{ propertyPrice(property?.price) }} per month
                        </span>
                    </v-card-text>
                    <v-card-text class="font-weight-bold">
                        Rooms:
                        <span class="font-weight-light">{{ property?.rooms }}</span>
                    </v-card-text>
                    <v-card-text class="font-weight-bold">
                        Bathrooms:
                        <span class="font-weight-light">{{ property?.wc }}</span>
                    </v-card-text>
                    <v-card-text class="font-weight-bold">
                        Parking slots:
                        <span class="font-weight-light">{{ property?.parking }}</span>
                    </v-card-text>
                    <v-card-text class="font-weight-bold">
                        Description:
                        <span class="font-weight-light">{{ property?.description }}</span>
                    </v-card-text>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <div class="mt-7 mb-3 elevation-2" style="height:400px">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false"
                    >
                        <LMarker 
                            :lat-lng="center"
                        >
                            <LPopup>
                                {{ property?.title }}
                            </LPopup>
                        </LMarker>
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<style>
    .text-pre-wrap {
        white-space: pre-wrap;
    }
</style>