var express = require('express');
var router = express.Router();

var app = require('../app');

const commodityData = require('../public/json/commodity.json')
const commodityListSuitcase = require('../public/json/right_list/suitcase.json')
const commodityListCellPhone = require('../public/json/right_list/cellphone.json')
const commodityListChildren = require('../public/json/right_list/children.json')
const commodityListHeadphone = require('../public/json/right_list/headphone.json')
const commodityListHousehold = require('../public/json/right_list/household.json')
const commodityListNotepad = require('../public/json/right_list/notepad.json')
const commodityListDress = require('../public/json/right_list/dress.json')
const commodityListPower = require('../public/json/right_list/power.json')
const commodityListRouter = require('../public/json/right_list/router.json')
const commodityListTelevision = require('../public/json/right_list/television.json')
const cellphoneSegment = require('../public/json/main/cellphone.json')
const householdSegment = require('../public/json/main/household.json')
const smartSegment = require('../public/json/main/smart.json')
const matchSegment = require('../public/json/main/match.json')
const partsSegment = require('../public/json/main/parts.json')
const recommendSegment = require('../public/json/main/recommend.json')
const relatedSegment = require('../public/json/main/related.json')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('millet',{title:'小米山寨商城'});
    //next();

});

router.get('/commodity',  (req, res) => {
    res.send(commodityData)
});

router.get('/commodityListCellPhone',  (req, res) => {
    res.send(commodityListCellPhone)
});

router.get('/commodityListTelevision',  (req, res) => {
    res.send(commodityListTelevision)
});

router.get('/commodityListNotepad',  (req, res) => {
    res.send(commodityListNotepad)
});

router.get('/commodityListHousehold',  (req, res) => {
    res.send(commodityListHousehold)
});

router.get('/commodityListDress',  (req, res) => {
    res.send(commodityListDress)
});

router.get('/commodityListPower',  (req, res) => {
    res.send(commodityListPower)
});

router.get('/commodityListRouter',  (req, res) => {
    res.send(commodityListRouter)
});

router.get('/commodityListChildren',  (req, res) => {
    res.send(commodityListChildren)
});

router.get('/commodityListHeadphone',  (req, res) => {
    res.send(commodityListHeadphone)
});

router.get('/commodityListSuitcase',  (req, res) => {
    res.send(commodityListSuitcase)
});

router.get('/cellphoneSegment',  (req, res) => {
    res.send(cellphoneSegment)
});

router.get('/householdSegment',  (req, res) => {
    res.send(householdSegment)
});

router.get('/smartSegment',  (req, res) => {
    res.send(smartSegment)
});

router.get('/matchSegment',  (req, res) => {
    res.send(matchSegment)
});

router.get('/partsSegment',  (req, res) => {
    res.send(partsSegment)
});

router.get('/recommendSegment',  (req, res) => {
    res.send(recommendSegment)
});

router.get('/relatedSegment',  (req, res) => {
    res.send(relatedSegment)
})

module.exports = router;
