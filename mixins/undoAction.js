
export default {
  data: () => ({
    count: 0
  }),

  methods: {
    undoAction (action, delay, undo, exec) {
      // Use a shorter name for `this.$createElement`
      const h = this.$createElement

      // Create a ID with a incremented count
      const id = `toast-undo-${this.count++}`
      let undone = false;

      const hideTO = setTimeout(() => {
        if (exec) { exec(); }
        this.$bvToast.hide(id)
      }, delay)

      // Create the custom close button
      const $undoButton = h(
        'b-button',
        {
          on: {
            click: () => {
              this.$bvToast.hide(id);
              if (!undone) {
                undone = true;
                undo();
              }
            }
          },

          props: {
            variant: 'link',
            size: 'sm'
          },

          class: ['font-weight-bolder']
        },
        'Cancel'
      )

      // Create the custom close button
      const $closeButton = h(
        'b-button',
        {
          on: {
            click: () => {
              clearTimeout(hideTO);
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
        [$undoButton, $closeButton]
      );

      const $body = h(
        'span',
        { class: ['w-100', 'd-flex', 'justify-content-between', 'align-items-center'] },
        [
          h('span', `${action}...`),
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
