export default function ({ store, redirect }) {
  if (!store.getters.hasToken) {
    return redirect('/login')
  }
}
