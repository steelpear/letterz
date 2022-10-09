export default function ({ app, redirect }) {
  const cookieRes = app.$cookies.get('DK8x42#FY5zD')
  if (!cookieRes) { return redirect('/login') }
}
