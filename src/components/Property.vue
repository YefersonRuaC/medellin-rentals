<script setup>
    defineProps({
        property: {
            type: Object
        },
        price: {
            type: Function
        }
    })
</script>

<template>
    <v-col cols="12" md="4">
        <v-card>
            <v-img :src="property.image" height="250" cover />

            <v-card-title class="font-weight-bold">
                {{ property.title }}
            </v-card-title>
            <v-card-text class="text-truncate">
                {{ property.description }}
            </v-card-text>
            <v-card-text class="text-h6">
                Price: 
                <span v-if="property.forSale">{{ price(property.price) }}</span>
                <span v-else class="ml-2">{{ price(property.price) }} per month</span>
            </v-card-text>
            <template v-slot:actions>
                <v-btn
                    block
                    color="info"
                    variant="flat"
                    :to="{name: 'property', params: {id: property.id} }"
                >
                    See info
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>