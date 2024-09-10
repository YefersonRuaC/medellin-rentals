<script setup>
  import useProperties from '@/composables/useProperties'
  import Property from '@/components/Property.vue'
  import { propertyPrice } from '@/helpers'

  const { forSale, filteredItems} = useProperties()

</script>

<template>
  <h1 class="text-center text-h4 font-weight-bold mt-2 mb-3">Your home in Medellin is waiting for you!</h1>

  <v-card flat class="bg-grey-lighten-5 px-3 py-3">
    <v-card-title class="text-h6">
      Search between renting or buying properties
      <v-checkbox 
        label="Properties for sale"  
        v-model="forSale"
      />
    </v-card-title>

    <v-row>
      <Property
        v-for="property in filteredItems"
        :key="property.id"
        :property="property"
        :price="propertyPrice"
      />
    </v-row>

  </v-card>
</template>