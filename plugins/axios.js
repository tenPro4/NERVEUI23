export default function ({ $axios, $noty }) {
  // $axios.onError(() => {
  //   $noty.error('Oops, something went wrong!')
  // })
  $axios.onResponse((response) => {
    if (response.data.error) {
      $noty.error(response.data.message)
    }
  })
}
