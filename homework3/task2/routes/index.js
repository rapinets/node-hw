/**
 * Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи.
 */

import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/coffee', function (req, res, next) {
  res.render('coffee', { title: 'Coffee' });
});

router.get('/music', function (req, res, next) {
  res.render('music', { title: 'Music' });
});

export default router
