import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/goals', function (req, res, next) {
  res.render('goals', {
    title: 'Goals',
    msg: 'goals...',
    goals: ['goal1', 'goal2', 'goal3', 'goal4']
  });
});

router.get('/info/:myLink', function (req, res, next) {
  const { myLink } = req.params

  let title, message
  switch (myLink) {
    case 'sites':
      title = 'Sites'
      message = 'My sites...'
      break;
    case 'films':
      title = 'Films'
      message = 'My films...'
      break;

    default:
      title = 'About Me'
      message = 'Info about me...'
      break;
  }

  res.render('info', { title: title, message: message });
});

export default router
