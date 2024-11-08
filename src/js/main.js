/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @iconUniformNames
 * @documentationApi
 * @objectifyEventListeners
 * @minimizeProperties
 * @parentElementSelector
 * @distinctEventListeners
 * @propertiesElemUnderscore
 * @propertify
 * @propertyNamingConventions
 * @methodNamingConventions
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {HTMLSourceElement}       [schema.title]
 * @param {HTMLSourceElement}       [schema.subtitle]
 * @param {URL}                     [schema.href]
 * @param {Function}                [schema.onClick]
 */
function DynamicText( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._subtitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._subtitleTextElem = null;

    /**
     * 
     * @property
     * @private
     * @var URL
     */
    this._href = null;

    /**
     * 
     * @property
     * @private
     */
    this._onClickCallback = null;




    var parentElem;

    if ( typeof schema.parent === 'object' ) {

        parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        parentElem = document.querySelector( schema.parent );

    }

    var fragment = document.createDocumentFragment();

    if ( schema.hasOwnProperty( 'title' ) ) {

        var titleElem = document.createElement( 'DIV' );
        titleElem.classList.add( 'title' );
        fragment.appendChild( titleElem );

        var titleTextElem = document.createElement( 'H2' );
        titleTextElem.innerHTML = schema.title;
        titleElem.appendChild( titleTextElem );

    }

    if ( schema.hasOwnProperty( 'href' ) ) {

        parentElem.classList.add( 'href' );
        this._href = schema.href;

    }

    if ( schema.hasOwnProperty( 'subtitle' ) ) {

        this._subtitleElem = document.createElement( 'DIV' );
        this._subtitleElem.classList.add( 'text' );
        fragment.appendChild( this._subtitleElem );

        if ( this._href === null ) {

            this._subtitleTextElem = document.createElement( 'P' );

        } else {

            this._subtitleTextElem = document.createElement( 'A' );
            this._subtitleTextElem.setAttribute( 'href', this._href );

        }

        this._subtitleTextElem.classList.add( 'subtitle' );
        this._subtitleTextElem.innerHTML = schema.subtitle;
        this._subtitleElem.appendChild( this._subtitleTextElem );

    }

    if ( schema.hasOwnProperty( 'onClick' ) ) {

        this._onClickCallback = schema.onClick;

    }

    parentElem.addEventListener( 'click', this._evt_click_parentElem.bind( this ) );

    parentElem.appendChild( fragment );

};

/**
 * 
 * @private
 * @method
 * @returns false|void
 */
DynamicText.prototype._evt_click_parentElem = function( evt ) {

    if ( this._href !== null ) {

        window.location.href = this._href;

    }

    if ( this._onClickCallback !== null ) {

        this._onClickCallback( evt );

    }

};

/**
 * 
 * @param {HTMLSourceElement} newSubtitle 
 */
DynamicText.prototype.setSubtitle = function( newSubtitle ) {

    var subtitleToChange = newSubtitle;

    this._subtitleElem.style.opacity = 0;

    setTimeout( function(){

        this._subtitleTextElem.innerHTML = subtitleToChange;

        this._subtitleElem.style.opacity = 1;

    }.bind( this ), 150 );

};