<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>

                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                    v-model="username"
                                    :rules="emailRules"
                                    autofocus
                                    validate-on-blur
                                    required
                                    prepend-icon="person"
                                    name="login"
                                    label="Login"
                                    type="text">
                            </v-text-field>
                            <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    required
                                    :counter="6"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password">
                            </v-text-field>
                        </v-form>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :disabled="!valid"
                        >Login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        data() {
            return {
                username: '',
                password: '',
                valid: false,
                emailRules: [
                    v => !!v || 'Phone is required',
                    // v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 4 || 'Password must be more than 4 characters'
                ]
            }
        },
        methods: {
            onSubmit() {
                let user;
                if (this.$refs.form.validate()) {
                    user = {
                        username: this.username,
                        password: this.password
                    };
                    this.$store.dispatch('login', user)
                }

            }
        }
    }
</script>

<style scoped>

</style>