<script setup>
    import useProperties from '@/composables/useProperties'
    import { propertyPrice } from '@/helpers'

    const { propertiesCollection, deleteItem } = useProperties()
</script>

<template>
    <h2 class="text-center text-h4 my-5 font-weight-bold">Manage properties</h2>
    <v-btn
        color="success ml-4"
        variant="flat"
        class="font-weight-bold"
        :to="{name: 'new-property'}"
    >
        New property
    </v-btn>

    <v-card class="mx-auto mt-5" flat>
        <v-list>
            <v-list-item
                v-for="property in propertiesCollection"
                :key="property.id"
                class="my-2 elevation-2"
            >
                <template v-slot:prepend>
                    <v-list-item-media class="mr-2 mt-2">
                        <img width="180" :src="property.image" />
                    </v-list-item-media>
                </template>

                <div class="ml-2">
                    <v-list-item-title class="text-h4">{{ property.title }}</v-list-item-title>
                    <v-list-item-subtitle class="text-h6">{{ propertyPrice(property.price) }}</v-list-item-subtitle>
                </div>
                
                <template v-slot:append>
                    <v-btn 
                        color="info" 
                        flat 
                        class="mr-2"
                        :to="{name: 'edit-property', params: { id:property.id } }"
                    >
                        Edit
                    </v-btn>
                    <v-btn 
                        color="red-darken-3" 
                        flat
                        @click="deleteItem(property.id, property.image)"
                    >
                        Delete
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>