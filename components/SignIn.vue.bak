<template>
  <div class="d-flex flex-column justify-content-center align-items-center sign-in-wrapper w-100">
    <b-form
      class="bg-light p-5 rounded"
      @submit.prevent="onSubmit"
    >
      <h3 class="w-100 text-center mb-4">
        Sign in
      </h3>

      <b-form-group
        label="Email Address"
        label-for="email-input"
        description="We will not share your email with anyone"
      >
        <b-form-input
          id="email-input"
          v-model="$v.form.email.$model"
          :state="validate('email')"
          type="email"
          placeholder="Enter email"
          aria-describedby="email-input-feedback"
        />
        <b-form-invalid-feedback
          id="email-input-feedback"
        >
          Email required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label="Password"
        label-for="password-input"
      >
        <b-form-input
          id="password-input"
          v-model="$v.form.password.$model"
          :state="validate('password')"
          type="password"
          placeholder="Enter Password"
          aria-describedby="password-input-feedback"
        />
        <b-form-invalid-feedback
          id="password-input-feedback"
        >
          8 characters required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- <err-alert :message="errMessage" /> -->
      <div class="w-100 d-flex justify-content-center">
        <b-button
          type="submit"
          variant="primary"
          :disabled="$nuxt.$loading && $nuxt.$loading.show"
        >
          Submit
        </b-button>
      </div>
      <div class="w-100 d-flex justify-content-center mt-2">
        <nuxt-link :to="`/register`" class="mr-3">
          Register
        </nuxt-link>
        <nuxt-link :to="`/request-password-reset`">
          Forgot Password
        </nuxt-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import form from '@/mixins/form.js'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  mixins: [form],
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    errMessage: ''
  }),
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  methods: {
    ...mapActions({
      submit: 'session/sign-in'
    }),

    async onSubmit () {
      this.errMessage = ''
      if (this.anyError()) { return }

      try {
        await this.submit({
          email: this.form.email,
          password: this.form.password
        })
        // this.$toast.success(
        //   'Success: Sign In'
        // )
        this.$emit('login')
      } catch (err) {
        console.log(err);
        // this.errMessage = err.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/modules/colors';

  .sign-in-wrapper {
    height: 100vh;
  }
</style>
