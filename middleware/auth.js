export default function ({ store, redirect }) {
  if (!store) {
    redirect('/sign-in')
  }
}
