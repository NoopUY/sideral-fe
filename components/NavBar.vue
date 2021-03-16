<template>
  <div id="nav">
    <div class="nav-header">
      <b-button class="nav-item hide-screen text-white" variant="transparent" @click="hidden=false">
        <b-iconstack font-scale="1">
          <b-icon stacked icon="dash" scale="2" shift-v="-5" />
          <b-icon stacked icon="dash" scale="2" />
          <b-icon stacked icon="dash" scale="2" shift-v="5" />
        </b-iconstack>
      </b-button>

      <div id="page-name" class="hide-screen">
        {{ pageName }}
      </div>

      <b-avatar
        class="nav-avatar"
        size="3em"
        src="https://www.gravatar.com/avatar/6dd402bc320f5db641223a48bff9d17d.jpg"
      />
      <!--
      <b-link
        class="nav-item"
        @click="onSignOut()"
      >
        <fa :icon="['fas', 'sign-out-alt']" class="fa-rotate-180" />
      </b-link> -->

      <b-link class="nav-item notification hide-mobile" to="/notifications">
        <fa :icon="['fas', 'bell']" />
        <b-badge pill variant="danger" class="notification-badge">
          3
        </b-badge>
      </b-link>

      <b-link to="/settings" class="nav-item hide-mobile">
        <fa :icon="['fas', 'cog']" />
      </b-link>
      <div class="nav-divider" />
    </div>

    <div :class="['nav', {'hidden': hidden}]">
      <div class="hide-screen w-100 d-flex flex-row justify-content-end pr-3 pt-3">
        <b-button variant="transparent" class="text-white" @click="hidden=true">
          <b-icon icon="X" scale="2" />
        </b-button>
      </div>

      <div class="nav-divider" />

      <b-link to="/home" class="nav-item d-flex flex-row w-100 justify-content-start pl-4">
        <b-icon icon="house" />
        <h6 class="hide-screen ml-3 mb-0 text-uppercase">
          Home
        </h6>
      </b-link>

      <b-link to="/batches" class="nav-item d-flex flex-row w-100 justify-content-start pl-4">
        <!-- <fa :icon="['fas', 'wine-glass']" /> -->
        <b-icon icon="bucket" />
        <h6 class="hide-screen ml-3 mb-0 text-uppercase">
          Batches
        </h6>
      </b-link>

      <b-link to="/stats" class="nav-item d-flex flex-row w-100 justify-content-start pl-4">
        <b-icon icon="bar-chart-line" />
        <h6 class="hide-screen ml-3 mb-0 text-uppercase">
          Stats
        </h6>
      </b-link>

      <b-link to="/calculator" class="nav-item d-flex flex-row w-100 justify-content-start pl-4">
        <b-icon icon="calculator" />
        <h6 class="hide-screen ml-3 mb-0 text-uppercase">
          Calculator
        </h6>
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      hidden: true
    }
  },
  computed: {
    pageName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapActions({ signOut: 'session/sign-out' }),
    onSignOut () {
      this.signOut()
      this.$router.replace({ path: '/sign-in' })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/modules/_colors.scss";
@import "@/assets/style/modules/_media.scss";
@import "@/assets/style/modules/_constants.scss";
@import "@/assets/style/modules/_mixins.scss";

#page-name {
  font-size: 1.4em;
  font-weight: 800;
  text-transform: uppercase;
}

#nav {

  @media #{$md-screen} {
    width: 100%;
    height: $nav-width;
    padding: 0px;
    flex-direction: row;
    justify-content: center;
  }

  @include flex(column-reverse, space-between);

  background-color: $color_primary;
  min-width: $nav-width;
  padding: 20px 0px 20px 0px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: $color_text;
    font-size: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: $nav-width;

    &.nuxt-link-exact-active {
      &::after {
        display: block;
      }
      z-index: 10;
      color: $color_accent;
    }

    &::after {
      content: "";
      width: 8px;
      height: 60%;
      background-color: $color_accent;
      display: none;
      position: absolute;
      left: -5px;
      z-index: -1;
      border-radius: 30%;
    }

    span {
      margin-top: 3px;
      font-size: 0.5em;
    }
  }

  .open {
    min-width: $nav-width;
  }
}

.nav {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1001;

  @media #{$md-screen} {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 60%;
    background-color: $color_primary;
    z-index: 9999;
    transition: left 0.2s ease-in-out 0.1s;
  }

  &.hidden {
    left: -70%;
  }
}

.nav-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column-reverse;
  z-index: 1001;

  @media #{$md-screen} {
    width: 100%;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
}

.nav-divider {
  width: 50%;
  height: 3px;
  background-color: lighten($color-primary, 5);
  margin: 10px 0px 10px 0px;

  @media #{$md-screen} {
    display: none;
  }
}

.nav-item {
  height: 50px;
}

.notification {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(110%, -110%);
  font-size: 0.5em;
}

.nav-avatar {
  @media #{$md-screen} {
    margin-right: 10px;
  }
}
</style>
