import { Router, Request, Response } from 'express'
import { MySQLClient, sql } from '../lib/database/client'
const router: Router = Router()

router.get('/', async (_: Request, res: Response): Promise<void> => {
  const result = await MySQLClient.executeQuery(await sql('SELECT_SHOP_LIST_BY_NAME'), [])
  console.log(result)

  res.render('./index.ejs')
})

export default router
