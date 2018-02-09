/* feedreader.js

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('should have a URL and that URL should not be blank', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            }
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('should have a name and that name should not be blank', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            }
        });
    });


    describe('The menu', function() {
        var body = $('body');
        /* Ensure the menu element is hidden by default */
        it('should hide the menu element by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        it('should show the menu when the menu icon is clicked and the menu is hidden and should hide the menu when the menu icon is clicked again', function() {
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should check that there is at least one entry in the feed container when the loadFeed function is called', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* Ensures that when a new feed is loaded by the loadFeed function,
         * the content actually changes.
         */
        var feedOne,
            feedTwo;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('.feed').text();
                loadFeed(1, function() {
                    feedTwo = $('.feed').text();
                    done();
                });
            });
        });
        it('should ensure the feed content changes when a new feed is loaded by the loadFeed function', function(done) {
            expect(feedOne).not.toEqual(feedTwo);
            done();
        });
    });
}());
