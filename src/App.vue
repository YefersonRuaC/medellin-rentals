<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth'

  const auth = useAuthStore()

  const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
</script>

<template>
  <v-app class="d-flex flex-column">
      <v-app-bar color="blue-grey-darken-4" class="px-12">
        <template v-slot:prepend>
            <v-btn :to="{name: 'home'}">Medellin - rentals</v-btn>
        </template>

        <template v-slot:append>
            <div v-if="auth.isAuth">
                <v-btn :to="{name: 'admin-properties'}">Admin</v-btn>
                <v-btn @click="auth.logout">Log out</v-btn>
            </div>

            <div v-else>
                <v-btn :to="{name: 'login'}">Log in</v-btn>
            </div>
        </template>
    </v-app-bar>

    <v-main class="flex-grow-1 px-4">
        <v-container max-width="1200">
            <RouterView />
        </v-container>
    </v-main>

    <v-toolbar color="blue-grey-darken-4" class="mt-7">
        <div class="d-flex w-100 align-center px-10">
            <strong>Contact us on our social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in icons"
              :key="icon"
              :icon="icon"
              class="mx-4"
              size="big"
              variant="plain"
            ></v-btn>
        </div>
    </v-toolbar>
  </v-app>
</template>