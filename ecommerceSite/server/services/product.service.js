var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('products');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    
    var deferred = Q.defer();
    db.products.find().toArray(function (err, products) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        // return products 
        products = _.map(products, function (product) {
            return _.omit(product, 'hash');
        });

        deferred.resolve(products);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.products.findById(_id, function (err, product) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (product) {
            // return product
            deferred.resolve(_.omit(product, 'hash'));
        } else {
            // product not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(productParam) {

    var deferred = Q.defer();

    // validation
    db.products.findOne(
        { productName: productParam.productName },
        function (err, product) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (product) {
                // product Name already exists
                deferred.reject('Product Name "' + productParam.productName + '" is already taken');
            } else {
                createProduct();
            }
        });

    function createProduct() {
        // set product object to productParam without the cleartext password
        var product = _.omit(productParam, 'password');

        db.products.insert(
            product,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, productParam) {
    var deferred = Q.defer();

    // validation
    db.products.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (product.productName !== productParam.productName) {
            // productName has changed so check if the new productName is already taken
            db.products.findOne(
                { productName: productParam.productName },
                function (err, product) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (product) {
                        // productName already exists
                        deferred.reject('Product Name "' + req.body.productName + '" is already taken')
                    } else {
                        updateProduct();
                    }
                });
        } else {
            updateProduct();
        }
    });

    function updateProduct() {
        // fields to update
        var set = {
            productName: productParam.productName,
            totalAvailability: productParam.totalAvailability,
            type: productParam.type
        };

        db.products.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.products.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}