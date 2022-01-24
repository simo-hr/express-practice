import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (_: Request, res: Response): void => {
  console.log('index')
  res.render('./index.ejs')
})

export default router
