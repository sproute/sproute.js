;(function(window) {
	var Sproute = {
		get: function (model) {
			return new GetRequest(model);
		},

		post: function (model) {
			return new PostRequest(model);
		}
	};

	function GetRequest (model) {
		this.model = model;
		this.url = "";
		this.query = [];
		this.method = "GET";

		this.xhr = new XMLHttpRequest;
	}

	GetRequest.prototype = {
		where: function (field, value) {
			this.url = field + "/" + value;
			return this;
		},

		range: function (field, from, to) {
			this.url = field + "/" + from + "/" + to;
			return this;
		},

		limit: function (skip, limit) {
			var q = "limit=";
			if (arguments.length == 1) {
				q += skip;
			} else {
				q += skip + "," + limit;
			}

			this.query.push(q);
			return this;
		},

		sort: function (field, direction) {
			direction = direction == 1 ? "asc" : "desc";
			this.query.push("sort=" + field + "," + direction);
			return this;
		},

		single: function () {
			this.query.push("single=true");
			return this;
		},

		end: function (callback) {
			var url = "/data/" + this.model + "/" + this.url;
			if (this.query.length) {
				url += "?" + this.query.join("&");
			}
			
			this.xhr.open(this.method, url);
			this.xhr.setRequestHeader("Accept", "application/json");
			this.xhr.onreadystatechange = function () {
				if (this.xhr.readyState == 4 && this.xhr.status) {
					var data = null;
					try {
						data = JSON.parse(this.xhr.responseText);
					} catch (e) {
						data = null;
					}

					callback && callback(
						(this.xhr.status === 200 ? null : this.xhr), 
						data
					);
				}
			}.bind(this);

			this.xhr.onerror = function (err) {
				callback && callback({
					status: 0
				});
			}

			this.xhr.send();
			return this;
		}
	};

	function PostRequest (model) {
		this.model = model;
		this.url = "";
		this.method = "POST";

		this.xhr = new XMLHttpRequest;
	}

	PostRequest.prototype = {
		where: function (field, value) {
			this.url = field + "/" + value;
			return this;
		},

		data: function (obj) {
			this.data = obj;
			return this;
		},

		end: function (callback) {
			var url = "/data/" + this.model + "/" + this.url;
			this.xhr.open(this.method, url);
			this.xhr.setRequestHeader("Accept", "application/json");
			this.xhr.setRequestHeader("Content-Type", "application/json");
			this.xhr.onreadystatechange = function () {
				if (this.xhr.readyState == 4 && this.xhr.status) {
					var data = null;
					try {
						data = JSON.parse(this.xhr.responseText);
					} catch (e) {
						data = null;
					}

					callback && callback(
						(this.xhr.status === 200 ? null : this.xhr), 
						data
					);
				}
			}.bind(this);

			this.xhr.onerror = function (err) {
				callback && callback({
					status: 0
				});
			}

			this.xhr.send(JSON.stringify(this.data));
		}
	}

	window.Sproute = Sproute;
})(window);