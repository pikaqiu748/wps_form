import * as Router from 'koa-router'
import { Context } from 'koa'
import { checkBody, checkToken } from '../middlewares/dataCheck'
import { checkLoginBody, checkRegisterBody } from './auth.check'
import { IRegisterReq } from '../types/request'
import { catchError, generateOk } from '../libs/check'
import * as userKit from '../kits/user'

const router = new Router({
  prefix: '/api/auth',
})

router.post('/register', checkBody(checkRegisterBody), async (ctx: Context) => {
  try {
    const { account, pwd } = ctx.request.body as IRegisterReq
    const id = await userKit.createUser(account, pwd)
    ctx.body = generateOk({ id })
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post('/login', checkBody(checkLoginBody), async (ctx: Context) => {
  try {
    const { account, pwd } = ctx.request.body as IRegisterReq
    const user = await userKit.login(account, pwd)
    ctx.cookies.set('token', user.id)
    ctx.body = generateOk(user)
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post('/logout', checkToken(userKit.checkToken), (ctx: Context) => {
  try {
    const token = ctx.cookies.get('token')
    userKit.logout(token)
    ctx.cookies.set('token', '')
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post('/logoff', checkToken(userKit.checkToken), async (ctx: Context) => {
  try {
    const { account } = ctx.request.body
    await userKit.logoff(account)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post(
  '/changePassWord',
  checkToken(userKit.checkToken),
  async (ctx: Context) => {
    try {
      const { account, newPwd } = ctx.request.body
      await userKit.setPassword(account, newPwd)
      ctx.body = generateOk()
    } catch (error) {
      catchError(error, ctx)
    }
  }
)

router.post('/avatar', checkToken(userKit.checkToken), async (ctx: Context) => {
  try {
    const { account, avatar } = ctx.request.body
    await userKit.setAvatar(account, avatar)
    ctx.body = generateOk()
  } catch (error) {
    catchError(error, ctx)
  }
})
export default router
