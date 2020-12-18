<template>
  <div>
    <b-form
      @submit.prevent="onSubmit"
    >
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
        <b-form-ipnvalid-feedback
          id="email-input-feedback"
        >
          Email required
        </b-form-ipnvalid-feedback>
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

      <err-alert :message="errMessage" />

      <b-row class="justify-content-md-left">
        <b-col
          md="2"
          cols="12"
        >
          <b-button
            type="submit"
            variant="primary"
            :disabled="$nuxt.$loading && $nuxt.$loading.show"
          >
            Submit
          </b-button>
        </b-col>
        <b-col
          v-if="slug"
          md="2"
          cols="12"
          class="pt-2"
        >
          <nuxt-link :to="`/${slug}/register`">
            Register
          </nuxt-link>
        </b-col>
        <b-col
          v-if="slug"
          md="8"
          cols="12"
          class="pt-2"
        >
          <nuxt-link :to="`/${slug}/request-password-reset`">
            Forgot Password
          </nuxt-link>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import form from '@/mixins/form.js'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  mixins: [form],
  props: {
    slug: { type: String, default: '' }
  },
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
      submit: 'users/sign-in'
    }),

    async onSubmit () {
      this.errMessage = ''
      if (this.anyError()) { return }

      try {
        await this.submit({
          email: this.form.email,
          password: this.form.password
        })
        this.$toast.success(
          'Success: Sign In'
        )
        this.$emit('login')
      } catch (err) {
        this.errMessage = err.response.data.message
      }
    }
  }
}
</script>
