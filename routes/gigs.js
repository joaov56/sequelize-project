const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//GET GIG LIST
router.get("/", (req, res) => {
  Gig.findAll()
    .then((gigs) => res.send(gigs))
    .catch((err) => `${err}`);
});

//ADD GIG

router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // INSERT INTO DB

  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email,
  })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log(err));
});

//SEARCH FOR GIGS

router.get("/search/:term", (req, res) => {
  const { term } = req.params;

  Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
    .then((results) => res.send(results))
    .catch((err) => res.send(err));
});

//DELETE GIGS

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const teste = [];

  Gig.destroy({
    where: {
      id: id,
    },
  });
});

module.exports = router;
