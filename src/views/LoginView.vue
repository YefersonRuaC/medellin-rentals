<script setup>
    import { useForm, useField } from 'vee-validate'
    import { loginSchema as validationSchema } from '../validation/loginSchema'
    import { useAuthStore } from '../stores/auth'

    const { handleSubmit } = useForm({ validationSchema })
    const auth = useAuthStore()

    const email = useField('email')
    const password = useField('password')
    
    const submit = handleSubmit((values) => {
        auth.login(values)
    })

</script>

<template>
    <v-card flat max-width="600" class="mx-auto mb-10 mt-5 bg-grey-lighten-5 px-4 py-4">
        <v-card-title class="text-h4 font-weight-bold">
            Log In
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Log in with your account
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            type="error"
            class="my-4"
            :title="auth.errorMessage"
        ></v-alert>

        <v-form class="mt-5">
            <v-text-field 
                type="email"
                label="Email"
                bg-color="grey-lighten-3"
                class="mb-2"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field 
                type="password"
                label="Password"
                bg-color="grey-lighten-3"
                class="mb-2"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />

            <v-btn
                block
                color="green-accent-4"
                class="text-white"
                @click="submit"
            >
                Log in
            </v-btn>
        </v-form>
    </v-card>
</template>