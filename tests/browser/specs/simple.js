/**
 * Tabs spec for KISSY.
 * @author yiminghe@gmail.com
 */

var Tabs = require('tabs');
var $ = require('node');
var UA = require('ua');
/*jshint quotmark:false*/
describe("tabs", function () {

    it("simple works", function () {
        var tabs = new Tabs({
            items: [
                {
                    title: 'tab-1',
                    selected: true,
                    content: '<p>panel-1</p>'
                },
                {
                    title: 'tab-2',
                    content: '<p>panel-2</p>'
                }
            ]
        }).render();

        expect($(".ks-tabs").length).to.be(1);
        expect($(".ks-tabs-tab").length).to.be(2);
        expect($(".ks-tabs-panel").length).to.be(2);
        expect($(".ks-tabs-tab").item(1).one('.ks-tabs-tab-content').html()).to.be('tab-2');
        expect($(".ks-tabs-panel").item(1).html().toLowerCase())
            .to.be('<p>panel-2</p>');

        expect(tabs.getSelectedTab().get('content')).to.be("tab-1");
        expect(tabs.getSelectedPanel().get('content')).to.be("<p>panel-1</p>");

        tabs.destroy();

        expect($(".ks-tabs").length).to.be(0);
    });

    describe("respond to event", function () {

        it("respond to click", function () {

            var tabs = new Tabs({
                items: [
                    {
                        title: 'tab-1',
                        selected: true,
                        content: '<p>panel-1</p>'
                    },
                    {
                        title: 'tab-2',
                        content: '<p>panel-2</p>'
                    }
                ]
            }).render();

            var tabB = $(".ks-tabs-tab").item(1);
            var runned = 0;
            tabs.on('afterSelectedTabChange', function (e) {
                expect(e.newVal).to.be(tabs.getSelectedTab());
                runned = 1;
            });

            window.simulateEvent(tabB[0], 'click');


            expect(runned).to.be(1);
            expect(tabs.getSelectedTab().get('content')).to.be("tab-2");
            expect(tabs.getSelectedPanel()
                .get('content').toLowerCase()).to.be("<p>panel-2</p>");

            tabs.destroy();
        });

        if (!UA.mobile) {
            it("respond to mouse", function (done) {
                var tabs = new Tabs({
                    changeType: 'mouse',
                    items: [
                        {
                            title: 'tab-1',
                            selected: true,
                            content: '<p>panel-1</p>'
                        },
                        {
                            title: 'tab-2',
                            content: '<p>panel-2</p>'
                        }
                    ]
                }).render();

                var tabB = $(".ks-tabs-tab").item(1);

                window.simulateEvent(tabB[0], 'mouseover');
                setTimeout(function () {
                    expect(tabs.getSelectedTab().get('content')).to.be("tab-2");
                    expect(tabs.getSelectedPanel()
                        .get('content').toLowerCase()).to.be("<p>panel-2</p>");

                    tabs.destroy();
                    done();
                }, 100);
            });
        }
    });

    it("add works", function () {

        var tabs = new Tabs({
            changeType: 'mouse',
            items: [
                {
                    title: 'tab-1',
                    selected: true,
                    content: '<p>panel-1</p>'
                },
                {
                    title: 'tab-2',
                    content: '<p>panel-2</p>'
                }
            ]
        }).render();

        tabs.addItem({
            selected: true,
            title: 'add-tab',
            content: 'add-panel'
        }, 1);


        expect(tabs.getTabs().length).to.be(3);

        expect($(".ks-tabs-tab").length).to.be(3);
        expect($(".ks-tabs-panel").length).to.be(3);

        expect(tabs.getSelectedTab().get('content')).to.be('add-tab');

        expect(tabs.getSelectedPanel().get('content')).to.be('add-panel');

        tabs.destroy();

    });

    describe("remove works", function () {

        it("works for unselected tab", function () {

            var tabs = new Tabs({
                changeType: 'mouse',
                items: [
                    {
                        title: 'tab-1',
                        selected: true,
                        content: '<p>panel-1</p>'
                    },
                    {
                        title: 'tab-2',
                        content: '<p>panel-2</p>'
                    }
                ]
            }).render();

            tabs.removeItemAt(1, true);

            expect(tabs.getTabs().length).to.be(1);
            expect(tabs.getPanels().length).to.be(1);

            expect($(".ks-tabs-tab").length).to.be(1);
            expect($(".ks-tabs-panel").length).to.be(1);

            expect(tabs.getSelectedTab().get('content')).to.be("tab-1");

            tabs.destroy();
        });


        it("works for selected tab", function () {

            var tabs = new Tabs({
                changeType: 'mouse',
                items: [
                    {
                        title: 'tab-1',
                        selected: true,
                        content: '<p>panel-1</p>'
                    },
                    {
                        title: 'tab-2',
                        content: '<p>panel-2</p>'
                    }
                ]
            }).render();

            tabs.removeItemAt(0, true);

            expect(tabs.getTabs().length).to.be(1);
            expect(tabs.getPanels().length).to.be(1);

            expect($(".ks-tabs-tab").length).to.be(1);
            expect($(".ks-tabs-panel").length).to.be(1);

            expect(tabs.getSelectedTab().get('content')).to.be("tab-2");

            tabs.destroy();
        });
    });


});