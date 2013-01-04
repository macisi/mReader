"use strict";

google.load("feeds", "1");

$(function(){

    var Feed = Backbone.Model.extend({

    });

    var FeedList = Backbone.Collection.extend({
        Model: Feed
    });

    var Result = Backbone.Model.extend({

        defaults: {
            query: "",
            queryResult: "",
            ready: false
        },

        initialize: function(){
            this.on("change:query", this.request);
        },

        request: function(){
            var _this = this;
            this.set("ready", false);
            google.feeds.findFeeds(this.get("query"), function(data){
                if (!data.error) {
                    _this.set("queryResult", data);
                    _this.set("ready", true);
                }
            });
        }

    });

    var feedlist = new FeedList;
    var result = new Result;

    /*订阅搜索View*/
    var SubscribeView = Backbone.View.extend({

        el: $("#subscribe"),

        model: result,

        events: {
            "click input[type='submit']": "search",
            "keypress input[type='search']": "search"
        },

        initialize: function(){
            this.input = this.$("input[type='search']");
            this.model.set("query", this.input.val());
            this.resultView = new ResultView;
        },

        search: function(event){
            if (event.type === "keypress" && event.keyCode !== 13) {
                return;
            }
            this.update();
            this.check(this);
        },
        /*直到ready为true才调用showResult*/
        check: function(o){
            if (!o.model.get("ready")) {
                setTimeout(function(){
                    o.check(o);
                }, 100);
            } else {
                o.showResult(o.model.get("queryResult"));
            }
        },

        /*更新query值*/
        update: function(){
            this.model.set("query", this.input.val());
        },

        showResult: function(data){
            this.resultView.render(data);
        }

    });

    var ResultView = Backbone.View.extend({
        el: $("#content"),

        events: {
            "click button.close": "remove",
            "click li>button": "addSubscribe"
        },

        template: Handlebars.compile($("#subscribeList").html()),

        render: function(data){
            this.$el.html(this.template(data));
        },

        addSubscribe: function(){
            console.log("add");
        },

        remove: function(){
            this.$el.empty();
        }
    });

    var FeedView = Backbone.View.extend({
        el: $("#content"),

        events: {
            "click li a": "showContent"
        },

        template: Handlebars.compile($("#feedContent-tpl").html()),

        showContent: function(event){
            event.preventDefault();
            this.loadFeed($(event.currentTarget).attr("href"));
        },

        loadFeed: function(url){
            var feed = new google.feeds.Feed(url),
                _this = this;
            feed.load(function(result) {
                if (!result.error) {
                    _this.render(result.feed);
                }
            });
        },

        render: function(data){
            this.$el.html(this.template(data));
        }
    });

    var feedView = new FeedView;

    var subscribeView = new SubscribeView();
});
