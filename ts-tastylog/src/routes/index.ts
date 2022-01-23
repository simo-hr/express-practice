import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (_: Request, res: Response): void => {
  res.render('./index.ejs')
})

export default router
