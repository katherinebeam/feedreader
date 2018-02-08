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
                expect(feed.url).not.toBe('');
            }
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('should have a name and that name should not be blank', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    describe('The menu', function() {
        /* Ensure the menu element is hidden by default */
        it('should hide the menu element by default', function() {
            expect($('.menu-hidden').is(':visible')).toBeTruthy();
        });

        it('should show the menu when the menu icon is clicked and the menu is hidden and should hide the menu when the menu icon is clicked again', function() {
            $('.menu-icon-link').trigger('click');
            expect($('.menu-hidden').is(':visible')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect($('.menu-hidden').is(':visible')).toBeTruthy();
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
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function() {
        /* Ensures that when a new feed is loaded by the loadFeed function,
         * the content actually changes.
         */
        var feed = $('.feed .entry');
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });
        });
        it('should ensure the feed content changes when a new feed is loaded by the loadFeed function', function(done) {
            expect($('.feed .entry')).not.toEqual(feed);
            done();
        });
    });
}());
