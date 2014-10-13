/**
 * lazy-render spec for KISSY.
 * @author yiminghe@gmail.com
 */

var Tabs = require('tabs');
/*jshint quotmark:false*/
describe("tabs lazy render", function () {
    it('simply works', function () {
        var tabs = new Tabs({
            lazyRender: true,
            items: [
                {
                    title: 't1',
                    selected: true,
                    content: 'c1'
                },
                {
                    title: 't2',
                    content: 'c2'
                }
            ]
        }).render();

        var called = 0;

        expect(tabs.getSelectedPanel().get('content')).to.be('c1');

        expect(tabs.getPanelAt(1).get('rendered')).not.to.ok();

        tabs.on('afterRenderUI', function (e) {
            var t = e.target;
            if (t.isTabsPanel) {
                expect(t.get('content')).to.be('c2');
                called = 1;
            }
        });

        tabs.setSelectedPanel(tabs.getPanelAt(1));

        expect(called).to.be(1);

        expect(tabs.getSelectedPanel().get('content')).to.be('c2');

        tabs.destroy();

    });

    it('add remove works', function () {
        var tabs = new Tabs({
            lazyRender: true,
            items: [
                {
                    title: 't1',
                    selected: true,
                    content: 'c1'
                }
            ]
        }).render();

        var called = 0;

        tabs.on('afterRenderUI', function (e) {
            var t = e.target;
            if (t.isTabsPanel) {
                expect(t.get('content')).to.be('c2');
                called = 1;
            }
        });

        tabs.addItem({
            title: 't2',
            content: 'c2',
            selected: true
        });

        expect(called).to.be(1);
        expect(tabs.getSelectedPanel().get('content')).to.be('c2');

        tabs.addItem({
            title: 't3',
            content: 't3'
        });

        expect(tabs.getSelectedPanel().get('content')).to.be('c2');

        expect(tabs.getPanelAt(2).get('rendered')).not.to.ok();

        expect(tabs.getPanels().length).to.be(3);

        tabs.removeItemAt(2);

        expect(tabs.getPanels().length).to.be(2);

        tabs.destroy();

    });

});