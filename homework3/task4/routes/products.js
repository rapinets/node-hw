import { Router } from 'express'
const router = Router()

const products = [
  {
    title: 'Tea',
    price: 300
  },
  {
    title: 'Milk',
    price: 90
  },
  {
    title: 'Bread',
    price: 47
  },
]

router.get('/', (req, res) => {
  res.render('products', { title: 'Products', products })
})

router.get('/add', (req, res) => {
  res.render('addproduct', { title: 'Add product' })
})

export default router