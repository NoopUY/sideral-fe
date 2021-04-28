
export default {
  data: () => ({
    count: 0
  }),

  methods: {
    delayAction ({ action, delay, exec, undo }) {
      // Use a shorter name for `this.$createElement`
      const h = this.$createElement

      // Create a ID with a incremented count
      const id = `toast-delaycancel-${this.count++}`

      const execTO = setTimeout(() => {
        if (exec) { exec(); }
        this.$bvToast.hide(id)
      }, delay)

      const countdown = Math.floor(delay / 1000);

      // Create the custom close button
      const $cancelButton = h(
        'b-button',
        {
          on: {
            click: () => {
              this.$bvToast.hide(id);
              clearTimeout(execTO);
              if (undo) { undo() }
            }
          },

          props: {
            variant: 'link',
            size: 'sm'
          },

          class: ['font-weight-bolder']
        },
        ['Cancel']
      )

      // Create the custom close button
      const $closeButton = h(
        'b-button',
        {
          on: {
            click: () => {
              this.$bvToast.hide(id);
            }
          },

          props: {
            variant: 'light'
          },

          class: ['text-secondary', 'font-weight-bold', 'p-0']

        },
        [h('b-icon', {
          props: { icon: 'x' }
        })]
      )

      const $actions = h(
        'span',
        {},
        [$cancelButton, $closeButton]
      );

      const $body = h(
        'span',
        { class: ['w-100', 'd-flex', 'justify-content-between', 'align-items-center'] },
        [
          h('span', `${action} in ${countdown}s... `),
          $actions
        ]
      );

      this.$bvToast.toast([$body], {
        id,
        appendToast: false,
        noAutoHide: true,
        noCloseButton: true,
        bodyClass: ['rounded-pill px-4'],
        toaster: 'b-toaster-bottom-right',
        isStatus: true
      })
    }

  }
}
