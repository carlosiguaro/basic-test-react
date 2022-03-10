import { Route, View } from '../setup/routes'

Route.set('/', ['unAuth'], View.SignIn);

Route.set('/create-member', ['auth'], View.CreateMember);

export { Route };