"use strict";

google.load("feeds", "1");

$(function(){

    /*添加订阅*/
    var Subscribe = Backbone.Model.extend({

        defaults: {
            query: ""
        },

        initialize: function(){
        }

    });

    var subscribe = new Subscribe;

    var SubscribeView = Backbone.View.extend({

        el: $("#subscribe"),

        template: Handlebars.compile($("#subscribeList").html()),

        events: {
            "click input[type='submit']": "search",
            "keypress input[type='search']": "search",
            "click .close": "remove"
        },

        initialize: function(){
            this.input = this.$("input[type='search']");
            this.model.set("query", this.input.val());
            this.result = {};
            this.resultContainer = this.$el.find("#result");

            _.bindAll()
        },

        search: function(event){
            var _this = this;
            if (event.type === "keypress" && event.keyCode !== 13) {
                return;
            }
            this.update();
            google.feeds.findFeeds(this.model.get("query"), function(result){
                if (!result.error) {
                    _this.result = result;
                    _this.render();
                }
            });
        },

        /*更新query值*/
        update: function(){
            this.model.set("query", this.input.val());
        },

        render: function(){
            this.resultContainer.html(this.template(this.result));
        },

        /*移除订阅搜索结果*/
        remove: function(){
            this.resultContainer.html("");
        }

    });

    var subscribeView = new SubscribeView({model: subscribe});


});
