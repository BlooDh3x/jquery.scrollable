var core = {
        queueName: "scrollableQueue"
        //queueName: "fx"
    },
    lib = {};

( function ( core, lib ) {
    "use strict";

    /**
     * API
     */

    $.fn.scrollable = function () {
        return getScrollable( this );
    };

    $.fn.scrollRange = function ( axis ) {
        return getScrollRange( this, axis );
    };

    $.fn.scrollTo = function ( position, options ) {
        scrollTo( this, position, options );
        return this;
    };

    /**
     * Does the actual work of $.fn.scrollable.
     *
     * @param   {jQuery} $container
     * @returns {jQuery}
     */
    function getScrollable ( $container ) {
        $container = lib.normalizeContainer( $container );
        return core.getScrollable( $container );
    }

    /**
     * Does the actual work of $.fn.scrollRange.
     *
     * @param   {jQuery} $container
     * @param   {string} axis
     * @returns {number|Object}
     */
    function getScrollRange( $container, axis ) {
        $container = lib.normalizeContainer( $container );
        axis = axis ? lib.normalizeAxisName( axis ) : lib.BOTH_AXES;

        return lib.getScrollMaximum( $container, axis );
    }

    /**
     * Does the actual work of $.fn.scrollTo.
     *
     * In jQuery fashion, animation callbacks (such as "start", "complete", etc) are bound to the animated element.
     * Please note that for window animations, the `this` of the callbacks is always set to the window, not the real
     * scrollable element (document element or body).
     *
     * @param {jQuery} $container
     * @param {number} position
     * @param {Object} [options]
     */
    function scrollTo ( $container, position, options ) {
        options = lib.normalizeOptions( options, position );
        $container = lib.normalizeContainer( $container );
        position = lib.normalizePosition( position, $container, options );

        if ( $.isWindow( $container[0] ) ) options = lib.bindAnimationCallbacks( options, $container[0] );
        // todo offer `append` option to append to previous scroll actions, otherwise clear the scroll queue first
        core.animateScroll( $container, position, options );
        // todo enforce final jump as a safety measure (by creating a new, aggregate done callback) - see Pagination.Views
    }

    // todo add stopScroll method which clears the scroll queue

} )( core, lib );