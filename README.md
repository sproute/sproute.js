## Sproute.js

This library contains helper functions to interact with the [REST API](http://getsproute.com/docs/rest) as well as [user accounts](http://getsproute.com/docs/users) for [Sproute spaces](http://getsproute.com). 

It is available to all Sproute Spaces under `http://<mysubdomain>.sproute.io/assets/sproute.min.js`.

### REST

#### [`Sproute.get(model)`](https://getsproute.com/docs/rest#datamodel)

Make a get request for a given model.

##### [`.where(field, value)`](https://getsproute.com/docs/rest#datamodelfieldvalue)

Retrieve rows where a field matches a value.

##### [`.range(field, from, to)`](https://getsproute.com/docs/rest#datamodelfieldfromto)

Retrieve rows where a field matches a range of two values.

##### [`.limit(skip, offset)`](https://getsproute.com/docs/rest#query-options)

Limit the amount of rows returned. Skip is the starting point (defaults to 0). Offset is how many rows to return after the starting point.

##### [`.sort(field, direction)`](https://getsproute.com/docs/rest#query-options)

Sort the results based on a field in ascending or descending order. Direction should be `1` for ascending or `-1` for descending.

##### [`.single()`](https://getsproute.com/docs/rest#query-options)

If one result is returned, return the object instead of a single element array.

##### `.end(callback)`

Run the request and execute the callback function. The arguments passed into the callback will be `err`, `body`. If no error occurs, it will be `null`.

#### [`Sproute.post(model)`](https://getsproute.com/docs/rest#post)

Make a post request for a given model.

##### [`.where(field, value)`](https://getsproute.com/docs/rest#datamodelfieldvalue-1)

Update existing data in a model.

##### `.data(object)`

The data to post to the end point. Will be stringified before sending as `application/json`.

##### `.end(callback)`

Run the request and execute the callback function. The arguments passed into the callback will be `err`, `body`. If no error occurs, it will be `null`.
