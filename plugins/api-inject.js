// export default ({ $axios }, inject) => {
//   inject('login', (user) => {
//     return $axios.$post('/api/user/login', user)
//   })
// }
import { http } from '../plugins/axios'
export default ({ $axios }, inject) => {
  inject('login', (user) => {
    return http.post('/user/login', user)
  })
}
