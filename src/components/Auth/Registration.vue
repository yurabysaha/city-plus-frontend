<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                    v-model="email"
                                    validate-on-blur
                                    :rules="emailRules"
                                    prepend-icon="person"
                                    name="email"
                                    label="Email"
                                    type="text">
                            </v-text-field>
                            <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    validate-on-blur
                                    required
                                    :counter="6"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password">
                            </v-text-field>
                            <v-text-field
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"
                                    required
                                    :counter="6"
                                    prepend-icon="lock"
                                    name="confirmPassword"
                                    label="Confirm Password"
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
                        >Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import userService from '@/services/user-service'
    export default {
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                valid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 6 || 'Password must be more than 6 characters'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Password is required',
                    v => v === this.password || 'Password should match!'
                ]
            }
        },
        methods: {
            onSubmit() {
                let user;
                if (this.$refs.form.validate()) {
                    user = {
                        email: this.email,
                        password1: this.password,
                        password2: this.confirmPassword
                    };
                    userService.register(user)
                        .then(() => this.$store.dispatch('login', {username: this.email, password: this.password}));
                }

            }
        }
    }
</script>

<style scoped>

</style>