const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const config = require('config');
const { body, validationResult } = require('express-validator');
const request = require('request');

// @route   /api/profile/me
// @desc    get current user profile
// @access private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      res.status(400).json({ msg: 'No profile found for current user' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile/
// @desc    sets current user profile
// @access  private

router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      githubusername,
    } = req.body;

    //build profile
    try {
      let profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (status) profileFields.status = status;
      if (bio) profileFields.bio = bio;
      if (githubusername) profileFields.githubusername = githubusername;
      profileFields.social = {
        youtube,
        facebook,
        linkedin,
        instagram,
        twitter,
      };
      if (youtube) profileFields.social.youtube = youtube;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
      if (twitter) profileFields.social.twitter = twitter;

      if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
      }

      let profile = await Profile.findOne({ user: profileFields.user });

      if (profile) {
        //update user
        profile = await Profile.findOneAndUpdate(
          { user: profileFields.user },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // new profile
        profile = new Profile(profileFields);
        await profile.save();
      }
      res.send(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route   get /api/profile/
// @desc    gets all user
// @access  public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   get /api/profile/user/:user_id
// @desc    gets profile by user_id
// @access  public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).send('No profile found');

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') return res.status(400).send('No profile found');
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/profile/
// @desc    delete the profile and user
// @access  private

router.delete('/', auth, async (req, res) => {
  try {
    // delete user posts
    await Post.deleteMany({ user: req.user.id });

    // deletes Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //deletes user
    await User.findOneAndRemove({ _id: req.user.id });

    res.send('User deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   Put /api/profile/experience
// @desc    Add a new experience
// @access private

router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'A title is required').not().isEmpty(),
      body('company', 'A comapny is required').not().isEmpty(),
      body('from', 'A from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    let newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete /api/profile/experience
// @desc    delete an experience
// @access private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const index = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);

    if (index === -1) res.status(400).send('Experience field not found');

    profile.experience.splice(index, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   Put /api/profile/education
// @desc    Add a new education
// @access private

router.put(
  '/education',
  [
    auth,
    [
      body('school', 'A school is required').not().isEmpty(),
      body('degree', 'A degree is required').not().isEmpty(),
      body('fieldofstudy', 'A field of study is required').not().isEmpty(),
      body('from', 'A from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    let newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete /api/profile/education
// @desc    delete an education
// @access private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const index = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    if (index === -1) res.status(400).send('Education field not found');
    profile.education.splice(index, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route   get /api/profile/github/:username
// @desc    get github repos
// @access private

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      headers: {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`,
      },
    };

    request(options, (error, response, body) => {
      if (error) throw error;

      if (response.statusCode !== 200) {
        return res.json([]);
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

module.exports = router;
