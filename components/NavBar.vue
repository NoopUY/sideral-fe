<template>
  <div id="nav">
    <div class="nav-header">
      <b-avatar
        class="nav-avatar"
        size="3em"
        src="https://www.gravatar.com/avatar/6dd402bc320f5db641223a48bff9d17d.jpg"
      />

      <b-link
        class="nav-item"
        @click="onSignOut()"
      >
        <fa :icon="['fas', 'sign-out-alt']" class="fa-rotate-180" />
      </b-link>

      <b-link class="nav-item notification" to="/notifications">
        <fa :icon="['fas', 'bell']" />
        <b-badge pill variant="danger" class="notification-badge">
          3
        </b-badge>
      </b-link>

      <b-link to="/settings" class="nav-item">
        <fa :icon="['fas', 'cog']" />
      </b-link>
      <div class="nav-divider" />
    </div>

    <div class="nav">
      <b-link to="/home" class="nav-item">
        <fa :icon="['fas', 'compass']" />
      </b-link>

      <b-link to="/batches" class="nav-item">
        <!-- <fa :icon="['fas', 'wine-glass']" /> -->
        <b-icon icon="bucket" />
      </b-link>

      <b-link to="/stats" class="nav-item">
        <fa :icon="['fas', 'chart-area']" />
      </b-link>

      <b-link to="/calculator" class="nav-item">
        <fa :icon="['fas', 'calculator']" />
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      opened: false
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

#nav {

  @media #{$md-screen} {
    @include bar-border("top", $color_primary);
    width: 100%;
    height: $nav-width;
    padding: 0px;
    flex-direction: row;
    justify-content: center;
  }

  @include flex(column-reverse, space-between);
  @include bar-border("right", $color_primary);

  height: 100%;
  background-color: $color_primary;
  min-width: $nav-width;
  position: fixed;
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
      width: 3px;
      height: 80%;
      background-color: $color_accent;
      display: none;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;

      @media #{$md-screen} {
        width: 70%;
        height: 4px;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
      }
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
    width: 100%;
    flex-flow: row;
    justify-content: space-around;
    align-items: center;
  }
}

.nav-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column-reverse;
  z-index: 1001;

  @media #{$md-screen} {
    display: none;
  }
}

.nav-divider {
  width: 80%;
  height: 2px;
  background-color: $color-secondary;
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
</style>
