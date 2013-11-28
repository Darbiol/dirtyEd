module.exports = function(app, custom_fields) {
	app.get('/custom-fields', listFields);
	app.get('/basic-fields', listBasicFields);
	app.post('/custom-fields', createField);

	//curl http://localhost:3000/custom-fields
	function listFields(req, res) {
		var options = {};
		if (req.query.skip) {
			options.skip = req.query.skip;
		}
		if (req.query.limit) {
		   	options.limit = req.query.limit;
		}
		custom_fields.customFieldsModel.find(null, null, options, function (err, docs) {
		    if (err) {
		    	//console.log(err);
		    	res.send(500, err);
		    } else {
		    	res.send(200, docs);
		    	console.log(docs);
		    }
		});
	}

	//curl http://localhost:3000/basic-fields
	function listBasicFields(req, res) {
		var options = {};
		if (req.query.skip) {
			options.skip = req.query.skip;
		}
		if (req.query.limit) {
		   	options.limit = req.query.limit;
		}
		custom_fields.customFieldsModel.find({ isBasic : true}, null, options, function (err, docs) {
		    if (err) {
		    	//console.log(err);
		    	res.send(500, err);
		    } else {
		    	res.send(200, docs);
		    	console.log(docs);
		    }
		});
	}

	//curl -d "label=First Name&fieldType=1&value[0]= &isPublic=1&isRequired=1&isBasic=1&isEditable=1" http://localhost:3000/custom-fields
	function createField(req, res) {
    	custom_fields.customFieldsModel.create(req.body, function (err, doc) {
    		if (err) {
    			console.log(err);
    		} else {
    			console.log('Added to db');
    			custom_fields.customFieldsModel.update({_id: doc.id}, {$push: {values: req.body.value}}, function (err, doc) {
		    		if (err) {
                        res.send(500, err);
		    			console.log(err);
		    		} else {
		    			console.log('Value pushed to DB');
		    		}
		    	});
    		}
    	});

    }
	
}